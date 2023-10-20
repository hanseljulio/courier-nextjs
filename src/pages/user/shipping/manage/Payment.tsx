import React, { useState, useEffect } from "react";
import styles from "./Payment.module.css";
import { IShippingData, IVouchers } from "@/types/types";
import { BASE_URL } from "@/constants/constants";
import { FaCircleArrowRight } from "react-icons/fa6";
import provinces from "@/database/provinces.json";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { useStoreLoginPersist } from "@/store/store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import VoucherPill from "@/components/VoucherPill";
import axios from "axios";

interface PaymentProps {
  shippingId: string;
  selectedId: number;
  exitPayment: () => void;
}

function Payment(props: PaymentProps) {
  const [shippingData, setShippingData] = useState<IShippingData>({
    id: 0,
    length: 0,
    width: 0,
    height: 0,
    weight: 0,
    start: {
      id: 0,
      address: "",
      city: "",
      province: "",
      zip: "",
    },
    destAddress: "",
    destCity: "",
    destProvince: "",
    destZip: "",
    category: "",
    description: "",
    date: "",
    insurance: false,
    sameDay: false,
    twoDay: false,
    alreadyPaid: false,
  });
  const [voucher, setVoucher] = useState<number>(0);
  const [showVoucherPrice, setShowVoucherPrice] = useState<boolean>(false);
  const [voucherList, setVoucherList] = useState<IVouchers[]>([]);
  const [discount, setDiscount] = useState<number>(0);
  const [basePrice, setBasePrice] = useState<number>(0);
  const [shipping, setShipping] = useState<number>(0);
  const [addonsTotal, setAddonsTotal] = useState<number>(0);
  const [totalCost, setTotalCost] = useState<number>(0);
  const [userBalance, setUserBalance] = useState<number>(0);
  const [referralCode, setReferralCode] = useState<string>("");
  const [referralUserId, setReferralUserId] = useState<number>(0);
  const [disableReferral, setDisableReferral] = useState<boolean>(false);

  const stateLoginPersist = useStoreLoginPersist();

  const getShippingData = async () => {
    try {
      const response = await fetch(`${BASE_URL}/users/${stateLoginPersist.id}`);
      const result = await response.json();

      setVoucherList(result.vouchers);

      const walletResponse = await fetch(
        `${BASE_URL}/userWallet/${result.walletId}`
      );
      const walletResult = await walletResponse.json();

      setUserBalance(walletResult.balance);

      const shippingResponse = await fetch(
        `${BASE_URL}/userShipping/${props.shippingId}`
      );
      const shippingResult = await shippingResponse.json();

      let base =
        ((shippingResult.shippingList[props.selectedId - 1].length *
          shippingResult.shippingList[props.selectedId - 1].weight *
          shippingResult.shippingList[props.selectedId - 1].height) /
          6000) *
        15000;

      setBasePrice(base);

      let max = 15000;
      let min = 10000;

      if (base < 4) {
        max = 13000;
      }

      let shippingPrice = Math.floor(Math.random() * (max - min + 1) + min);

      setShipping(shippingPrice);

      setShippingData(shippingResult.shippingList[props.selectedId - 1]);

      if (shippingResult.shippingList[props.selectedId - 1].insurance) {
        setAddonsTotal((prevAddOn) => prevAddOn + 5000);
      }

      if (shippingResult.shippingList[props.selectedId - 1].sameDay) {
        setAddonsTotal((prevAddOn) => prevAddOn + 50000);
      }

      if (shippingResult.shippingList[props.selectedId - 1].twoDay) {
        setAddonsTotal((prevAddOn) => prevAddOn + 30000);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getShippingData();
  }, []);

  useEffect(() => {
    let total = basePrice + shipping + addonsTotal - discount;
    setTotalCost(total);
  }, [basePrice, shipping, addonsTotal, discount]);

  const getProvince = (id: string) => {
    return provinces.provinces[parseInt(id) - 1].province;
  };

  const currencyConverter = (money: number): string => {
    return money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + ",00";
  };

  const referralCheck = async () => {
    const lengthError = () =>
      toast(
        "Referral codes have a length of six characters. Please check again!"
      );

    const successSelfReferral = () =>
      toast(
        "Wait you're not supposed to - oh well. You just earned 50% of your balance. How desperate are you to use your own referral code?"
      );

    const selfReferralFail = () =>
      toast("Your own referral code? You can't do that! Unless...");

    const successReferral = () => toast("Referral sucessfully used!");

    const notFound = () => toast("Referral is not valid. Please check again!");

    const referralAbuse = () =>
      toast(
        "Nice try - we added checks to make sure you can't keep using this feature! Complete a shipment before you can use it again!"
      );

    if (referralCode.length < 6 || referralCode.length > 6) {
      lengthError();
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/referralCodes`);
      const result = await response.json();

      for (let i = 0; i < result.length; i++) {
        if (
          referralCode.toLowerCase() === result[i].referral.toLowerCase() &&
          result[i].userId === stateLoginPersist.id &&
          totalCost > 350000
        ) {
          const response = await fetch(
            `${BASE_URL}/users/${stateLoginPersist.id}`
          );
          const result = await response.json();

          const walletResponse = await fetch(
            `${BASE_URL}/userWallet/${result.walletId}`
          );
          const walletResult = await walletResponse.json();

          if (
            walletResult.history[walletResult.history.length - 1].selfReferral
          ) {
            referralAbuse();
            return;
          }

          let addedMoney = Math.floor(userBalance / 2);

          let newBalance = userBalance + addedMoney;

          walletResult.balance = newBalance;

          setUserBalance(newBalance);

          const newTransaction = {
            id: walletResult.history.length + 1,
            date: new Date().toString(),
            amount: addedMoney,
            selfReferral: true,
          };

          walletResult.history.push(newTransaction);

          axios
            .patch(`${BASE_URL}/userWallet/${result.walletId}`, walletResult)
            .then(() => {
              setDisableReferral(true);
              successSelfReferral();
            });

          return;
        } else if (
          referralCode.toLowerCase() === result[i].referral.toLowerCase() &&
          result[i].userId !== stateLoginPersist.id
        ) {
          setReferralUserId(result[i].userId);
          successReferral();
          return;
        } else if (
          referralCode.toLowerCase() === result[i].referral.toLowerCase() &&
          result[i].userId === stateLoginPersist.id
        ) {
          selfReferralFail();
          return;
        }
      }

      notFound();
    } catch (e) {
      console.log(e);
    }
  };

  const voucherCheck = (code: string) => {
    const codeArray = code.split("-");
    const discountAmount = parseInt(codeArray[0]) / 100;
    const discountType = codeArray[1];
    const discountMinimum = parseInt(codeArray[2]);

    const thresholdFail = () =>
      toast(
        "You do not seem to meet the minimum amount needed for this voucher - try selecting another one!"
      );

    const voucherApplied = () => toast("Voucher successfully applied!");

    if (totalCost < discountMinimum) {
      thresholdFail();
      return;
    }
  };

  return (
    <div className={`${styles.modal}`}>
      <ToastContainer />
      <div className={`${styles.overlay}`}></div>
      <div className={`${styles.modalContent} ${styles.popout}`}>
        <div className="header-confirm pt-[10px] pl-[23px] pb-[8px]">
          <div className="title-area flex justify-between items-center py-1">
            <h2 className="text-2xl">Payment</h2>
            <button className="pr-[43px]" onClick={props.exitPayment}>
              X
            </button>
          </div>
        </div>
        <hr />
        <div className="address-content flex-col pt-[10px] pl-[23px] pb-[8px] font-medium mr-[20px] overflow-y-scroll h-[90%]">
          <div className="order-details">
            <div className="order-address-section flex justify-evenly items-center w-full py-8">
              <div className="starting-address bg-amber-200 p-4 rounded-[10px] w-[250px]">
                <h1>{shippingData.start.address}</h1>
                <h1 className="mobile:text-[12px]">{`${shippingData.start.city}, ${shippingData.start.province}, ${shippingData.start.zip}`}</h1>
              </div>
              <div className="arrow-icon">
                <FaCircleArrowRight className="text-[40px]" />
              </div>
              <div className="dest-address bg-amber-200 p-4 rounded-[10px] w-[250px]">
                <h1>{shippingData.destAddress}</h1>
                <h1 className="mobile:text-[12px]">{`${
                  shippingData.destCity
                }, ${
                  shippingData.destProvince
                    ? getProvince(shippingData.destProvince)
                    : shippingData.destProvince
                }, ${shippingData.destZip}`}</h1>
              </div>
            </div>
            <div className="order-size-details text-center pb-6 text-slate-900 mobile:text-[14px]">
              <h1>{`Dimensions: ${shippingData.length}cm x ${shippingData.width}cm x ${shippingData.height}cm, Weight: ${shippingData.weight}kg`}</h1>
              <h1>{`Category: ${shippingData.category}, Description: ${
                shippingData.description
                  ? shippingData.description
                  : "No description"
              } `}</h1>
            </div>
          </div>
          <div className="pricing-area flex mobile:flex-col mobile:text-[12px]">
            <div className="bill-section p-8 border-r-2 border-slate-300 mobile:text-center">
              <h1 className="underline text-[30px]">TOTAL PRICE</h1>
              <h1 className="py-3">
                <pre>Base Price: Rp. {currencyConverter(basePrice)}</pre>
              </h1>
              <h1 className="py-3">
                <pre>Shipping total: Rp. {currencyConverter(shipping)}</pre>
              </h1>
              <h1 className="py-3 mobile:hidden">
                <pre>Addons: Rp. {currencyConverter(addonsTotal)}</pre>
              </h1>
              {shippingData.insurance ? (
                <h1 className="py-3 ml-3 mobile:ml-0">
                  <pre>Insurance: + Rp 5.000,00</pre>
                </h1>
              ) : null}
              {shippingData.sameDay ? (
                <pre>
                  <h1 className="py-3 ml-3 mobile:ml-0">
                    <pre>Same-day delivery: + Rp 50.000,00</pre>
                  </h1>
                </pre>
              ) : null}
              {shippingData.twoDay ? (
                <h1 className="py-3 ml-3 mobile:ml-0">
                  <pre>Two-day delivery: + Rp. 30.000,00</pre>
                </h1>
              ) : null}

              {showVoucherPrice ? (
                <h1>
                  <pre>Discounts: - Rp. {currencyConverter(discount)}</pre>
                </h1>
              ) : null}
              <br />
              <h1 className="py-3 text-[40px] mobile:text-[25px]">
                Rp. {currencyConverter(totalCost)}
              </h1>
            </div>
            <div className="referral-voucher-section w-full p-10 mobile:p-0 ">
              <div className="referral-section text-center flex items-center gap-8 mobile:flex-col mobile:gap-0 mobile:pb-8 mobile:mx-auto">
                <Input
                  label="Got a referral?"
                  type="text"
                  name="search"
                  placeholder="Use it here!"
                  styling="pb-8 text-left mobile:text-center"
                  width="w-[300px] mobile:w-[250px]"
                  onChange={(e) => setReferralCode(e.target.value)}
                  disabled={disableReferral}
                />
                <Button
                  text="Check"
                  styling="p-4 bg-amber-400 rounded-[10px] w-[150px] hover:bg-amber-500"
                  onClick={referralCheck}
                  disabled={disableReferral}
                />
              </div>
              <h1 className="text-center pb-4">Available vouchers:</h1>
              <div className="vouchers-section flex justify-center gap-4 mobile:flex-col">
                {voucherList.map((voucher, index) => {
                  return (
                    <div key={index} className="text-center">
                      <VoucherPill
                        key={index}
                        code={voucher.code}
                        applyVoucher={voucherCheck}
                      />
                      <p className="text-[12px] font-normal text-center pt-2">
                        {voucher.description}
                      </p>
                    </div>
                  );
                })}
              </div>
              <div className="pay-section flex items-center justify-center gap-10 mt-[43px] mobile:flex-col">
                <h1>Your balance: Rp. {currencyConverter(userBalance)}</h1>
                <Button
                  text="Pay"
                  styling="p-4 bg-amber-400 rounded-[10px] w-[150px] hover:bg-amber-500"
                  onClick={() =>
                    alert(`Remaining money: ${userBalance - totalCost}`)
                  }
                  disabled={totalCost > userBalance}
                />
              </div>
              {totalCost > userBalance ? (
                <h1 className="text-center pt-5 text-red-600">
                  INSUFFICENT BALANCE - Add more money then come back!
                </h1>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
