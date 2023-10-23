import React, { useState } from "react";
import styles from "@/styles/Table.module.css";
import EditPromo from "@/pages/admin/managePromo/EditPromo";
import { AiOutlineEdit } from "react-icons/ai";

interface TableDataProps {
  index: number;
  id: number;
  code: string;
  description: string;
  expirationDate: string;
  quantity: number;
  refreshFunction: () => void;
}

function PromoTableData(props: TableDataProps) {
  const [showEdit, setShowEdit] = useState<boolean>(false);

  const editOn = () => {
    setShowEdit(true);
  };

  const editOff = () => {
    setShowEdit(false);
    props.refreshFunction();
  };

  const dateConverter = (date: Date) => {
    const time = date.toTimeString().substring(0, 5);

    const modifiedDate = date.toUTCString().substring(4, 16);

    return `${time} - ${modifiedDate}`;
  };

  return (
    <>
      {showEdit && <EditPromo exitFunction={editOff} promoId={props.id} />}

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
          {props.quantity}
        </td>
        <td
          className={`${styles.tdArea} px-[20px] py-[10px] text-left font-medium`}
        >
          <button className="text-[25px]" onClick={editOn}>
            <AiOutlineEdit className="text-[#D84727] hover:text-amber-500" />
          </button>
        </td>
      </tr>
    </>
  );
}

export default PromoTableData;
