import React, { useState } from "react";
import styles from "@/styles/Table.module.css";
import { BsTrash } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
import WarningModal from "@/components/WarningModal";

interface TableDataProps {
  index: number;
  id: number;
  date: string;
  amount: number;
  fromUserId: number;
  fromShippingId: string;
  shippingNum: number;
}

function EarningsTableData(props: TableDataProps) {
  const dateConverter = (date: Date) => {
    const time = date.toTimeString().substring(0, 5);

    const modifiedDate = date.toUTCString().substring(4, 16);

    return `${time} - ${modifiedDate}`;
  };

  const currencyConverter = (money: number): string => {
    return money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + ",00";
  };

  return (
    <>
      <tr className={`${props.index % 2 === 0 ? "bg-white" : "bg-amber-100"}`}>
        <td
          className={`${styles.tdArea} px-[20px] py-[10px] text-left font-medium`}
        >
          {props.id}
        </td>
        <td
          className={`${styles.tdArea} px-[20px] py-[10px] text-left font-medium`}
        >
          {dateConverter(new Date(props.date))}
        </td>
        <td
          className={`${styles.tdArea} px-[20px] py-[10px] text-left font-medium`}
        >
          {`Rp. ${currencyConverter(props.amount)}`}
        </td>
        <td
          className={`${styles.tdArea} px-[20px] py-[10px] text-left font-medium`}
        >
          {props.fromUserId}
        </td>
        <td
          className={`${styles.tdArea} px-[20px] py-[10px] text-left font-medium`}
        >
          {props.fromShippingId}
        </td>
        <td
          className={`${styles.tdArea} px-[20px] py-[10px] text-left font-medium`}
        >
          {props.shippingNum}
        </td>
      </tr>
    </>
  );
}

export default EarningsTableData;
