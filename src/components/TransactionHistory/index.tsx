import React from "react";
import styles from "./TransactionHistory.module.css";
import { IWalletHistory } from "@/types/types";

interface TransactionHistoryProps {
  exitFunction: () => void;
  historyData: IWalletHistory[];
}

function TransactionHistory(props: TransactionHistoryProps) {
  const dateConverter = (date: Date) => {
    const time = date.toTimeString().substring(0, 5);

    const modifiedDate = date.toUTCString().substring(4, 16);

    return `${time} - ${modifiedDate}`;
  };

  const currencyConverter = (money: number): string => {
    return money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + ",00";
  };

  return (
    <div className={`${styles.modal}`}>
      <div className={`${styles.overlay}`}></div>
      <div className={`${styles.modalContent} ${styles.popout}`}>
        <div className="header-confirm pt-[10px] pl-[23px] pb-[8px] flex justify-between">
          <h2 className="text-xl">Transaction History</h2>
          <button className="pr-[23px]" onClick={props.exitFunction}>
            X
          </button>
        </div>
        <hr />
        <div className="history-content flex-col pt-[10px] pl-[23px] pb-[8px] font-medium mr-[20px] overflow-y-scroll h-[90%]">
          {props.historyData.map((data, index) => (
            <div
              key={index}
              className="flex justify-center text-center history-section"
            >
              <h1 className="bg-amber-200 py-3 w-[10%]">{data.id}</h1>
              <h1 className="bg-amber-200 py-3 w-[40%]">
                {dateConverter(new Date(data.date))}
              </h1>
              <h1 className="bg-amber-200 py-3 w-[50%] text-green-600">
                +Rp. {currencyConverter(data.amount)}
              </h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TransactionHistory;
