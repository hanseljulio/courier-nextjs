import React, { useState } from "react";
import styles from "@/styles/Table.module.css";
import { BsTrash, BsTypeH1 } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";

interface TableDataProps {
  index: number;
  id: number;
  startAddress: string;
  destAddress: string;
  date: string;
  description: string;
  status: boolean;
}

function ShippingTableData(props: TableDataProps) {
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
            <h1 className="text-red-500">UNPAID</h1>
          ) : (
            <h1 className="text-green-500">PAID</h1>
          )}
        </td>
      </tr>
    </>
  );
}

export default ShippingTableData;
