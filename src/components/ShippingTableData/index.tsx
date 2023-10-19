import React, { useState } from "react";
import styles from "@/styles/Table.module.css";
import Payment from "@/pages/user/shipping/manage/Payment";

interface ShippingTableDataProps {
  index: number;
  id: number;
  startAddress: string;
  destAddress: string;
  date: string;
  description: string;
  status: boolean;
  shippingId: string;
}

function ShippingTableData(props: ShippingTableDataProps) {
  const [showPayment, setShowPayment] = useState<boolean>(false);

  const paymentOn = () => {
    setShowPayment(true);
  };

  const paymentOff = () => {
    setShowPayment(false);
  };

  return (
    <>
      {showPayment && (
        <Payment
          shippingId={props.shippingId}
          selectedId={props.id}
          exitPayment={paymentOff}
        />
      )}
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
