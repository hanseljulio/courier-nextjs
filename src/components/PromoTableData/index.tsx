import React, { useState } from "react";
import styles from "@/styles/Table.module.css";
import EditPromo from "../EditPromo";
import { AiOutlineEdit } from "react-icons/ai";
import WarningModal from "../WarningModal";
import { BsTrash } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface TableDataProps {
  index: number;
  id: number;
  code: string;
  description: string;
  expirationDate: string;
  quantity: number;
  refreshFunction: () => void;
  deleteFunction: (voucherId: number) => void;
}

function PromoTableData(props: TableDataProps) {
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  const deleteOn = () => {
    setShowDeleteModal(true);
  };

  const deleteSuccess = () => toast("Promo has been successfully deleted!");

  const deleteOff = () => {
    setShowDeleteModal(false);
    props.deleteFunction(props.id);
    props.refreshFunction();
    deleteSuccess();
  };

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

      {showDeleteModal && (
        <WarningModal
          problem="This promo will be deleted permanently."
          solution="There's no going back. Are you sure you want to proceed?"
          solutionBtn="Delete Promo"
          redirectFunction={deleteOff}
          exitFunction={() => {
            setShowDeleteModal(false);
          }}
        />
      )}

      <ToastContainer />

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
          <div className="flex justify-around">
            <button className="text-[25px]" onClick={editOn}>
              <AiOutlineEdit className="text-[#D84727] hover:text-amber-500" />
            </button>
            <button className="text-[25px]" onClick={deleteOn}>
              <BsTrash className="text-[#D84727] hover:text-amber-500" />
            </button>
          </div>
        </td>
      </tr>
    </>
  );
}

export default PromoTableData;
