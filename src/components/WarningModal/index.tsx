import React from "react";
import styles from "./WarningModal.module.css";
import Button from "../Button";

interface WarningModalProps {
  problem: string;
  solution: string;
  solutionBtn: string;
  redirectFunction?: () => void;
}

function WarningModal(props: WarningModalProps) {
  return (
    <div className={`${styles.modal}`}>
      <div className={`${styles.overlay}`}></div>
      <div className={`${styles.modalContent} ${styles.popout}`}>
        <div className="header-confirm pt-[10px] pl-[23px] pb-[8px] flex justify-between">
          <div className="title-area">
            <h2 className="text-xl font-bold text-red-600">ALERT!</h2>
          </div>
        </div>
        <hr />
        <div className="history-content flex-col pt-[10px] pl-[23px] pb-[8px] font-medium mr-[20px] h-[90%]">
          <h1>{props.problem}</h1>
          <br />
          <h1>{props.solution}</h1>
          <div className="redirect-btn flex justify-center pt-[60px]">
            <Button
              text={props.solutionBtn}
              styling="p-4 mb-[50px] bg-amber-400 rounded-[10px] w-[200px] hover:bg-amber-500"
              onClick={props.redirectFunction}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default WarningModal;
