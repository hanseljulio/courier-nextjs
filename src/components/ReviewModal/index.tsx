import React, { useState, useEffect } from "react";
import styles from "./ReviewModal.module.css";
import { IVouchers } from "@/types/types";
import { BASE_URL } from "@/constants/constants";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

interface ReviewModalProps {
  userId: number;
  shippingNum: number;
  shippingId: string;
  exitFunction: () => void;
  submitFunction: () => void;
}

function ReviewModal(props: ReviewModalProps) {
  const [reviewText, setReviewText] = useState<string>("");

  const emptyText = () =>
    toast("You need at least 10 characters to post the review!");

  const submit = async (e: any) => {
    e.preventDefault();

    if (reviewText.length < 10) {
      emptyText();
      return;
    }

    const reviewData = {
      userId: props.userId,
      shippingNum: props.shippingNum,
      review: reviewText,
      date: new Date().toString(),
    };

    try {
      await axios.post(`${BASE_URL}/userReviews`, reviewData);

      const response = await fetch(
        `${BASE_URL}/userShipping/${props.shippingId}`
      );
      const result = await response.json();

      result.shippingList[props.shippingNum - 1].alreadyReviewed = true;

      await axios.patch(`${BASE_URL}/userShipping/${props.shippingId}`, result);

      props.submitFunction();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={`${styles.modal}`}>
      <ToastContainer />
      <div className={`${styles.overlay}`}></div>
      <div className={`${styles.modalContent} ${styles.popout}`}>
        <div className="header-confirm pt-[10px] pl-[23px] pb-[8px]">
          <div className="title-area flex justify-between items-center py-1">
            <h2 className="text-2xl">Review</h2>
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
          <h1>Please provide feedback for your shipping!</h1>
          <div className="edit-form-div flex justify-center text-center pt-10">
            <form action="" onSubmit={submit}>
              <textarea
                className="bg-amber-200 px-5 py-5 w-[610px] h-[280px] mobile:h-[500px] mobile:w-[300px]"
                onChange={(e) => setReviewText(e.target.value)}
              />

              <Button
                text="Post review"
                styling="p-3 rounded-[8px] w-[200px] my-6 bg-amber-400  hover:bg-amber-500"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewModal;
