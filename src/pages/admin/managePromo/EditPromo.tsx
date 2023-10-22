import React, { useState, useEffect } from "react";
import styles from "./EditPromo.module.css";
import { IVouchers } from "@/types/types";
import { BASE_URL } from "@/constants/constants";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

interface EditPromoProps {
  promoId: number;
  exitFunction: () => void;
}

function EditPromo(props: EditPromoProps) {
  const [promoData, setPromoData] = useState<IVouchers>({
    id: 0,
    code: "",
    description: "",
    expirationDate: "",
  });

  const [newDate, setNewDate] = useState<string>("1970-01-01");
  const [newTime, setNewTime] = useState<string>("00:00");

  const updateSuccess = () => toast("Promo has been successfully updated!");

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

  const submit = async (e: any) => {
    e.preventDefault();

    await axios.patch(`${BASE_URL}/userVouchers/${props.promoId}`, promoData);

    updateSuccess();
  };

  const getPromoData = async () => {
    try {
      const response = await fetch(`${BASE_URL}/userVouchers/${props.promoId}`);
      const result = await response.json();

      setNewDate(formatDate(new Date(result.expirationDate)));
      setNewTime(formatTime(new Date(result.expirationDate)));

      setPromoData(result);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getPromoData();
  }, []);

  useEffect(() => {
    setPromoData({
      ...promoData,
      expirationDate: new Date(`${newDate} ${newTime}`).toString(),
    });
  }, [newDate, newTime]);

  return (
    <div className={`${styles.modal}`}>
      <ToastContainer />
      <div className={`${styles.overlay}`}></div>
      <div className={`${styles.modalContent} ${styles.popout}`}>
        <div className="header-confirm pt-[10px] pl-[23px] pb-[8px]">
          <div className="title-area flex justify-between items-center py-1">
            <h2 className="text-2xl">Edit Promo</h2>
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
          <div className="notice-div">
            <h1>
              Remember to follow the right format: (discount)-(code)-(minimum
              amount)
            </h1>
            <h1>
              Use the code &apos;xab&apos; for base price discount,
              &apos;shp&apos; for shipping discount.
            </h1>
          </div>
          <div className="edit-form-div flex justify-center text-center pt-10">
            <form action="" onSubmit={submit}>
              <Input
                label="Code"
                type="text"
                name="promoCode"
                value={promoData.code}
                styling="pb-5 text-left"
                width="w-[400px]"
                onChange={(e) =>
                  setPromoData({ ...promoData, code: e.target.value })
                }
              />
              <Input
                label="Description"
                type="text"
                name="promoDescription"
                value={promoData.description}
                styling="pb-5 text-left"
                width="w-[400px]"
                onChange={(e) =>
                  setPromoData({ ...promoData, description: e.target.value })
                }
              />
              <Input
                label="Expiration Date"
                type="date"
                name="promoExpirationDate"
                value={formatDate(new Date(promoData.expirationDate))}
                styling="pb-5 text-left"
                width="w-[400px]"
                onChange={(e) => {
                  setNewDate(e.target.value);
                }}
              />
              <Input
                label="Expiration Time"
                type="time"
                name="promoExpirationDate"
                value={formatTime(new Date(promoData.expirationDate))}
                styling="pb-5 text-left"
                width="w-[400px]"
                onChange={(e) => {
                  setNewTime(e.target.value);
                }}
              />
              <div className="submit-btn pt-10">
                <Button
                  text="Edit Promo"
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

export default EditPromo;
