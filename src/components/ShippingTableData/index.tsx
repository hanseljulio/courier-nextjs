import React, { useState } from "react";
import styles from "@/styles/Table.module.css";
import Payment from "@/pages/user/shipping/manage/Payment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ShippingTableDataProps {
  index: number;
  id: number;
  startAddress: string;
  destAddress: string;
  date: string;
  description: string;
  status: boolean;
  shippingId: string;
  refresh: () => void;
}

function ShippingTableData(props: ShippingTableDataProps) {
  const [showPayment, setShowPayment] = useState<boolean>(false);
  const paidMessage = () =>
    toast(
      "Payment sucessful! Go to the games section for a chance to win prizes!"
    );

  const paymentOn = () => {
    setShowPayment(true);
  };

  const paymentOff = () => {
    setShowPayment(false);
  };

  const paymentSubmit = () => {
    setShowPayment(false);
    props.refresh();
    paidMessage();
  };

  return (
    <>
      {showPayment && (
        <Payment
          shippingId={props.shippingId}
          selectedId={props.id}
          exitPayment={paymentOff}
          paymentSubmit={paymentSubmit}
        />
      )}
      <ToastContainer />
      <tr className={`${props.index % 2 === 0 ? "bg-white" : "bg-amber-100"}`}>
        <td
          className={`${styles.tdArea} px-[20px] py-[10px] text-left font-medium`}
        >
          {props.id}
        </td>
        <td
          className={`${styles.tdArea} px-[20px] py-[10px] text-left font-medium`}
        >
          {props.startAddress}
        </td>
        <td
          className={`${styles.tdArea} px-[20px] py-[10px] text-left font-medium`}
        >
          {props.destAddress}
        </td>
        <td
          className={`${styles.tdArea} px-[20px] py-[10px] text-left font-medium`}
        >
          {props.date}
        </td>
        <td
          className={`${styles.tdArea} px-[20px] py-[10px] text-left font-medium`}
        >
          {props.description}
        </td>
        <td
          className={`${styles.tdArea} px-[20px] py-[10px] text-left font-medium`}
        >
          {!props.status ? (
            <h1
              className="text-red-500 hover:cursor-pointer"
              onClick={paymentOn}
            >
              UNPAID
            </h1>
          ) : (
            <h1 className="text-green-500">PAID</h1>
          )}
        </td>
      </tr>
    </>
  );
}

export default ShippingTableData;
