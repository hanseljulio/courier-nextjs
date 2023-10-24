import React from "react";
import styles from "@/styles/Table.module.css";

interface ShippingTableDataProps {
  index: number;
  id: number;
  startAddress: string;
  destAddress: string;
  date: string;
  description: string;
  status: boolean;
  currentStatus: string;
  shippingId: string;
  alreadyReviewed: boolean;
  refresh: () => void;
  paymentOn?: (selectedId: number) => void;
  reviewOn?: (selectedId: number) => void;
}

function ShippingTableData(props: ShippingTableDataProps) {
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
            <h1
              className="text-red-500 hover:cursor-pointer"
              onClick={() => {
                if (props.paymentOn) {
                  props.paymentOn(props.id);
                }
              }}
            >
              UNPAID
            </h1>
          ) : (
            <h1 className="text-green-500">PAID - {props.currentStatus}</h1>
          )}
          {props.currentStatus === "Delivered" && !props.alreadyReviewed && (
            <h1
              onClick={() => {
                if (props.reviewOn) {
                  props.reviewOn(props.id);
                }
              }}
              className="text-orange-500 hover:cursor-pointer mobile:text-[14.5px]"
            >
              [ REVIEW ]
            </h1>
          )}
        </td>
      </tr>
    </>
  );
}

export default ShippingTableData;
