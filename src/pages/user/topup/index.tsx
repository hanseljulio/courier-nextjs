import React, { useState, useEffect } from "react";
import UserNav from "@/components/UserNav";
import UserHeader from "@/components/HeaderSection";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TransactionHistory from "@/components/TransactionHistory";
import { IWallet } from "@/types/types";
import { BASE_URL } from "@/constants/constants";
import { useStoreLoginPersist } from "@/store/store";
import { useRouter } from "next/router";
import axios from "axios";

function TopUp() {
  const [money, setMoney] = useState<number>(0);
  const [showHistory, setShowHistory] = useState<boolean>(false);
  const stateLoginPersist = useStoreLoginPersist();
  const router = useRouter();

  const [walletData, setWalletData] = useState<IWallet>({
    id: "",
    userId: 0,
    balance: 0,
    history: [],
  });

  const currencyConverter = (money: number): string => {
    return money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + ",00";
  };

  const getWalletData = async () => {
    try {
      const response = await fetch(`${BASE_URL}/users/${stateLoginPersist.id}`);
      const result = await response.json();

      const walletResponse = await fetch(
        `${BASE_URL}/userWallet/${result.walletId}`
      );
      const walletResult = await walletResponse.json();
      setWalletData(walletResult);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (stateLoginPersist.id === 0 || stateLoginPersist.isAdmin) {
      router.push("/error");
    }

    getWalletData();
  }, []);

  const toggleHistoryOn = () => {
    setShowHistory(true);
  };

  const toggleHistoryOff = () => {
    setShowHistory(false);
  };

  const errorMessage = () =>
    toast("Money must be between Rp. 10.000 and Rp. 10.000.000!");

  const successMessage = () =>
    toast(`Success! A total of ${money} has been added to your account!`);

  const submit = async (e: any) => {
    e.preventDefault();

    if (money < 10000 || money > 10000000) {
      errorMessage();
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/users/${stateLoginPersist.id}`);
      const result = await response.json();

      const walletResponse = await fetch(
        `${BASE_URL}/userWallet/${result.walletId}`
      );
      const walletResult = await walletResponse.json();

      walletResult.balance += parseInt(money.toString());
      walletResult.history.push({
        id: walletResult.history.length + 1,
        date: new Date().toString(),
        amount: parseInt(money.toString()),
        selfReferral: false,
      });

      axios
        .patch(`${BASE_URL}/userWallet/${result.walletId}`, walletResult)
        .then(() => {
          getWalletData();
          successMessage();
        });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      {showHistory && (
        <TransactionHistory
          historyData={walletData.history}
          exitFunction={toggleHistoryOff}
        />
      )}
      <div>
        <UserNav currentPage="topup" />
        <ToastContainer />
        <div className="header-section pb-8">
          <UserHeader title="Top Up" description="Add your balance here!" />
        </div>
        <div
          className={`mobile:mx-auto your-balance-section mx-[350px] pt-[30px] text-center`}
        >
          <h1 className="text-[25px] pb-3">
            Your current balance is:{" "}
            <span className="text-amber-500 mobile:whitespace-pre">
              Rp. {currencyConverter(walletData.balance)}
            </span>
          </h1>
          <p className="text-center">How much would you like to add?</p>
        </div>
        <div className="top-up-form pt-8">
          <form action="" onSubmit={submit}>
            <div className="form-section items-center flex justify-center gap-5">
              <h1 className="font-bold mt-2 text-[20px]">IDR</h1>
              <Input
                label=""
                type="number"
                name="topupValue"
                width="w-[300px]"
                onChange={(e) => setMoney(e.target.value)}
              />
            </div>
            <div className="submit-btn items-center flex justify-center pt-4">
              <Button
                text="Add Money"
                styling="p-3 rounded-[8px] w-[300px] my-6 bg-amber-400  hover:bg-amber-500"
              />
            </div>
          </form>
        </div>
        <div className="submit-btn items-center flex justify-center pt-2">
          <Button
            text="Show Topup History"
            styling="p-3 rounded-[8px] w-[300px] my-6 bg-amber-400  hover:bg-amber-500"
            onClick={toggleHistoryOn}
          />
        </div>
      </div>
    </>
  );
}

export default TopUp;
