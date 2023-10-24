import React, { useState, useEffect } from "react";
import styles from "./AddPromo.module.css";
import { IVouchers } from "@/types/types";
import { BASE_URL } from "@/constants/constants";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Dropdown from "../Dropdown/Dropdown";

interface AddPromoProps {
  exitFunction: () => void;
}

function AddPromo(props: AddPromoProps) {
  const [newDate, setNewDate] = useState<string>("");
  const [newTime, setNewTime] = useState<string>("");
  const [voucherAffects, setVoucherAffects] = useState<string>("Base price");
  const [discount, setDiscount] = useState<number>(0);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0);

  const addSuccess = () => toast("Promo has been successfully added!");

  const formatDate = (date: Date) => {
    let year = date.getFullYear();
    let month = "";
    let currentDate = "";

    if (date.getMonth() < 9) {
      month = `0${date.getMonth() + 1}`;
    } else {
      month = `${date.getMonth() + 1}`;
    }

    if (date.getDate() < 9) {
      currentDate = `0${date.getDate()}`;
    } else {
      currentDate = `${date.getDate()}`;
    }

    return `${year}-${month}-${currentDate}`;
  };

  const formatTime = (date: Date) => {
    let hours = "";
    let minutes = "";

    if (date.getHours() < 9) {
      hours = `0${date.getHours()}`;
    } else {
      hours = `${date.getHours()}`;
    }

    if (date.getMinutes() < 10) {
      minutes = `0${date.getMinutes()}`;
    } else {
      minutes = `${date.getMinutes()}`;
    }

    return `${hours}:${minutes}`;
  };

  const currencyConverter = (money: number): string => {
    return money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + ",00";
  };

  const submit = async (e: any) => {
    e.preventDefault();

    const discountError = () =>
      toast(
        "Discount has to be between 0 and 100. Shipping can have a maximum 100% discount."
      );
    const discountBaseError = () =>
      toast(
        "You can't be serious. You're about to ship something for free! Base price discount has to be less than 100."
      );

    const dateError = () => toast("Please input a date after today!");

    const timeError = () => toast("Please fill in the time!");

    const minPriceError = () =>
      toast("Minimum price has to be Rp. 50.000 or greater!");

    const quantityError = () => toast("Quantity has to be greater than 0!");

    if (discount <= 0 || discount > 100) {
      discountError();
      return;
    }

    if (voucherAffects === "Base price" && discount >= 100) {
      discountBaseError();
      return;
    }

    if (minPrice < 50000) {
      minPriceError();
      return;
    }

    if (newDate === "" || new Date(newDate).getTime() <= new Date().getTime()) {
      dateError();
      return;
    }

    if (newTime === "") {
      timeError();
      return;
    }

    if (quantity <= 0) {
      quantityError();
      return;
    }

    let newCode = "";
    let newDescription = "";
    let expirationDate = new Date(`${newDate} ${newTime}`).toString();

    if (voucherAffects === "Base price") {
      newCode = `${discount}-xab-${minPrice}`;
      newDescription = `${discount}% discount if total is above Rp. ${currencyConverter(
        minPrice
      )}`;
    } else if (voucherAffects === "Shipping") {
      newCode = `${discount}-shp-${minPrice}`;

      if (discount === 100) {
        newDescription = `Free shipping if total is above Rp. ${currencyConverter(
          minPrice
        )}`;
      } else {
        newDescription = `${discount}% shipping discount if total is above Rp. ${currencyConverter(
          minPrice
        )}`;
      }
    }

    const newPromo = {
      code: newCode,
      description: newDescription,
      expirationDate: expirationDate,
      quantity: quantity,
    };

    await axios.post(`${BASE_URL}/userVouchers`, newPromo);

    addSuccess();
  };

  // useEffect(() => {
  //   setPromoData({
  //     ...promoData,
  //     expirationDate: new Date(`${newDate} ${newTime}`).toString(),
  //   });
  // }, [newDate, newTime]);

  return (
    <div className={`${styles.modal}`}>
      <ToastContainer />
      <div className={`${styles.overlay}`}></div>
      <div className={`${styles.modalContent} ${styles.popout}`}>
        <div className="header-confirm pt-[10px] pl-[23px] pb-[8px]">
          <div className="title-area flex justify-between items-center py-1">
            <h2 className="text-2xl">Add Promo</h2>
            <button
              onClick={props.exitFunction}
              className="pr-[43px] mobile:pr-[23px]"
            >
              X
            </button>
          </div>
        </div>
        <hr />
        <div className="edit-promo-content flex-col pt-[10px] pl-[23px] pb-[8px] font-medium mr-[20px] h-[90%]">
          <div className="edit-form-div flex justify-center text-center pt-10">
            <form action="" onSubmit={submit}>
              <Dropdown
                label="Voucher affects:"
                labelStyle="font-bold pb-2 text-left"
                width="w-[400px]"
                spacing="pb-5"
                options={["Base price", "Shipping"]}
                onChange={(e) => setVoucherAffects(e)}
              />
              <div className="flex justify-between">
                <Input
                  label="Discount (%)"
                  type="number"
                  name="promoDescription"
                  styling="pb-5 text-left"
                  width="w-[180px]"
                  onChange={(e) => setDiscount(parseInt(e.target.value))}
                />
                <Input
                  label="Minimum price (Rp.)"
                  type="number"
                  name="promoDescription"
                  styling="pb-5 text-left"
                  width="w-[180px]"
                  onChange={(e) => setMinPrice(parseInt(e.target.value))}
                />
              </div>

              <Input
                label="Expiration Date"
                type="date"
                name="promoExpirationDate"
                styling="pb-5 text-left"
                width="w-[400px]"
                onChange={(e) => setNewDate(e.target.value)}
              />
              <Input
                label="Expiration Time"
                type="time"
                name="promoExpirationDate"
                styling="pb-5 text-left"
                width="w-[400px]"
                onChange={(e) => setNewTime(e.target.value)}
              />
              <Input
                label="Quantity"
                type="number"
                name="promoQuantity"
                styling="pb-5 text-left"
                width="w-[400px]"
                onChange={(e) => setQuantity(parseInt(e.target.value))}
              />
              <div className="submit-btn pt-10">
                <Button
                  text="Add Promo"
                  styling="p-4 mb-[50px] bg-amber-400 rounded-[10px] w-[200px] hover:bg-amber-500"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddPromo;
