import React from "react";
import styles from "./SelectionModal.module.css";
import { IAddress } from "@/types/types";

interface SelectionModalProps {
  addressList: IAddress[];
  selectAddressFunction: (address: IAddress) => void;
}

function SelectionModal(props: SelectionModalProps) {
  return (
    <div className={`${styles.modal}`}>
      <div className={`${styles.overlay}`}></div>
      <div className={`${styles.modalContent} ${styles.popout}`}>
        <div className="header-confirm pt-[10px] pl-[23px] pb-[8px] flex justify-between">
          <div className="title-area">
            <h2 className="text-xl">Select your starting address</h2>
          </div>
        </div>
        <hr />
        <div className="address-content flex-col pt-[10px] pl-[23px] pb-[8px] font-medium mr-[20px] overflow-y-scroll h-[90%]">
          {props.addressList.map((address, index) => (
            <div
              key={index}
              onClick={() => props.selectAddressFunction(address)}
              className="address-section hover:cursor-pointer hover:bg-amber-400 w-full bg-amber-200 px-6 py-8 my-6 rounded-[8px]"
            >
              <h1>{address.address}</h1>
              <h1 className="mobile:text-[12px]">{`${address.city}, ${address.province}, ${address.zip}`}</h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SelectionModal;
