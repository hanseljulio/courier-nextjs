import React, { useState } from "react";
import styles from "@/styles/Table.module.css";
import { BsTrash } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
import WarningModal from "@/components/WarningModal";

interface TableDataProps {
  adminMode?: boolean;
  index: number;
  id: number;
  address: string;
  city: string;
  province: string;
  zip: string;
  extra?: string;
  editFunction?: (id: number) => void;
  deleteFunction?: (id: number) => void;
  showDelete?: (id: number) => void;
}

function TableData(props: TableDataProps) {
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
          {props.address}
        </td>
        <td
          className={`${styles.tdArea} px-[20px] py-[10px] text-left font-medium`}
        >
          {props.city}
        </td>
        <td
          className={`${styles.tdArea} px-[20px] py-[10px] text-left font-medium`}
        >
          {props.province}
        </td>
        <td
          className={`${styles.tdArea} px-[20px] py-[10px] text-left font-medium`}
        >
          {props.zip}
        </td>
        <td
          className={`${styles.tdArea} px-[20px] py-[10px] text-left font-medium`}
        >
          {props.extra ? (
            props.extra
          ) : (
            <div className="button-area flex justify-around mobile:gap-6">
              <button
                className="text-[25px]"
                onClick={() => {
                  if (props.editFunction) {
                    props.editFunction(props.id);
                  }
                }}
              >
                <AiOutlineEdit className="text-[#D84727] hover:text-amber-500" />
              </button>
              <button
                className="text-[25px]"
                onClick={() => {
                  if (props.showDelete) {
                    props.showDelete(props.id);
                  }
                }}
              >
                <BsTrash className="text-[#D84727] hover:text-amber-500" />
              </button>
            </div>
          )}
        </td>
      </tr>
    </>
  );
}

export default TableData;
