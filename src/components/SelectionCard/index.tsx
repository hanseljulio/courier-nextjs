import React from "react";
import styles from "./SelectionCard.module.css";

interface SelectionCardProps {
  picture: string;
  title?: string;
  description?: string;
  onClick?: () => void;
}

function SelectionCard(props: SelectionCardProps) {
  return (
    <div className="selection-card-div" onClick={props.onClick}>
      <div
        className={`${styles.cardArea} ${styles.popout} relative selection-card-area ${props.picture} bg-cover hover:cursor-pointer w-[300px] h-[450px] rounded-[8px] justify-center`}
      >
        <div
          className={`text-area bg-slate-500 bg-opacity-80 rounded-b-[10px] flex-col absolute bottom-0 w-full`}
        >
          <div className="pl-[20px] title-div px-2 py-1 font-small text-[25px] justify-center">
            <h1 className="drop-shadow-lg text-white">{props.title}</h1>
          </div>
          <div className="pl-[22px] description-div px-2 py-4 font-small text-[15px] justify-center">
            <h1 className="drop-shadow-lg text-white">{props.description}</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SelectionCard;
