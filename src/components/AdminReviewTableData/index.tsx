import React from "react";
import styles from "@/styles/Table.module.css";
import "react-toastify/dist/ReactToastify.css";

interface ShippingTableDataProps {
  index: number;
  id: number;
  userId: number;
  shippingNum: number;
  date: string;
  review: string;
}

function AdminReviewTableData(props: ShippingTableDataProps) {
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
          {props.userId}
        </td>
        <td
          className={`${styles.tdArea} px-[20px] py-[10px] text-left font-medium`}
        >
          {props.shippingNum}
        </td>
        <td
          className={`${styles.tdArea} px-[20px] py-[10px] text-left font-medium`}
        >
          {dateConverter(new Date(props.date))}
        </td>
        <td
          className={`${styles.tdArea} px-[20px] py-[10px] text-left font-medium`}
        >
          {props.review}
        </td>
      </tr>
    </>
  );
}

export default AdminReviewTableData;
