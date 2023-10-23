import React, { useState } from "react";
import styles from "@/styles/Table.module.css";
import { BsTrash, BsInfoCircle } from "react-icons/bs";
import WarningModal from "../WarningModal";
import ShippingInfo from "../ShippingInfo";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ShippingTableDataProps {
  index: number;
  id: number;
  userId: number;
  startAddress: string;
  destAddress: string;
  description: string;
  status: boolean;
  adminShippingId: number;
  deleteFunction: (adminId: number, userId: number) => void;
  refresh: () => void;
}

function AdminShippingTableData(props: ShippingTableDataProps) {
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  const editOn = () => {
    setShowEdit(true);
  };

  const editOff = () => {
    setShowEdit(false);
  };

  const hideDeleteWarning = () => {
    setShowDeleteModal(false);
  };

  const deleteShipping = () => {
    props.deleteFunction(props.adminShippingId, props.userId);
    setShowDeleteModal(false);
  };

  const showDeleteWarning = () => {
    setShowDeleteModal(true);
  };

  return (
    <>
      {showEdit && (
        <ShippingInfo
          adminShippingId={props.adminShippingId}
          exitFunction={editOff}
        />
      )}

      {showDeleteModal && (
        <WarningModal
          problem="This shipping will be deleted permanently."
          solution="There's no going back. Are you sure you want to proceed?"
          solutionBtn="Delete Shipping"
          redirectFunction={deleteShipping}
          exitFunction={hideDeleteWarning}
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
            <button className="text-[25px]" onClick={editOn}>
              <BsInfoCircle className="text-[#D84727] hover:text-amber-500" />
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

export default AdminShippingTableData;
