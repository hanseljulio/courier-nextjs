import React, { useState } from "react";
import styles from "@/styles/Table.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BsTrash, BsInfoCircle } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";

interface ShippingTableDataProps {
  index: number;
  id: number;
  userId: number;
  startAddress: string;
  destAddress: string;
  description: string;
  status: boolean;
  shippingId: string;
  refresh: () => void;
}

function AdminShippingTableData(props: ShippingTableDataProps) {
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const paidMessage = () =>
    toast(
      "Payment sucessful! Go to the games section for a chance to win prizes!"
    );

  const editOn = () => {
    setShowEdit(true);
  };

  const editOff = () => {
    setShowEdit(false);
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
          {props.description}
        </td>
        <td
          className={`${styles.tdArea} px-[20px] py-[10px] text-left font-medium`}
        >
          {props.status ? "Paid - Processing" : "Unpaid"}
        </td>
        <td
          className={`${styles.tdArea} px-[20px] py-[10px] text-left font-medium`}
        >
          <div className="button-area flex justify-around mobile:gap-6">
            <button className="text-[25px]">
              <BsInfoCircle className="text-[#D84727] hover:text-amber-500" />
            </button>
            <button className="text-[25px]">
              <AiOutlineEdit className="text-[#D84727] hover:text-amber-500" />
            </button>
            <button className="text-[25px]">
              <BsTrash className="text-[#D84727] hover:text-amber-500" />
            </button>
          </div>
        </td>
      </tr>
    </>
  );
}

export default AdminShippingTableData;
