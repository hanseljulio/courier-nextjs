import React, { useState } from "react";
import styles from "@/styles/Table.module.css";
import WarningModal from "@/components/WarningModal";

interface TableDataProps {
  index: number;
  id: number;
  code: string;
  description: string;
  expirationDate: string;
}

function PromoTableData(props: TableDataProps) {
  const dateConverter = (date: Date) => {
    const time = date.toTimeString().substring(0, 5);

    const modifiedDate = date.toUTCString().substring(4, 16);

    return `${time} - ${modifiedDate}`;
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
          {props.code}
        </td>
        <td
          className={`${styles.tdArea} px-[20px] py-[10px] text-left font-medium`}
        >
          {props.description}
        </td>
        <td
          className={`${styles.tdArea} px-[20px] py-[10px] text-left font-medium`}
        >
          {dateConverter(new Date(props.expirationDate))}
        </td>
        <td
          className={`${styles.tdArea} px-[20px] py-[10px] text-left font-medium`}
        >
          EDIT
        </td>
      </tr>
    </>
  );
}

export default PromoTableData;
