import React, { useState } from "react";
import styles from "@/styles/Table.module.css";
import { BsTrash } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
import WarningModal from "@/components/WarningModal";

interface TableDataProps {
  index: number;
  id: number;
  address: string;
  city: string;
  province: string;
  zip: string;
  editFunction?: () => void;
  deleteFunction?: (id: number) => void;
}

function TableData(props: TableDataProps) {
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  const deleteAddress = () => {
    if (props.deleteFunction) {
      props.deleteFunction(props.id);
    }
    setShowDeleteModal(false);
  };

  const showDeleteWarning = () => {
    setShowDeleteModal(true);
  };
  return (
    <>
      {showDeleteModal && (
        <WarningModal
          problem="This address will be deleted permanently."
          solution="There's no going back. Are you sure you want to proceed?"
          solutionBtn="Delete Address"
          redirectFunction={deleteAddress}
          exitFunction={() => {
            setShowDeleteModal(false);
          }}
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
          <div className="button-area flex justify-around mobile:gap-6">
            <button className="text-[25px]" onClick={props.editFunction}>
              <AiOutlineEdit className="text-[#D84727] hover:text-amber-500" />
            </button>
            <button className="text-[25px]" onClick={showDeleteWarning}>
              <BsTrash className="text-[#D84727] hover:text-amber-500" />
            </button>
          </div>
        </td>
      </tr>
    </>
  );
}

export default TableData;
