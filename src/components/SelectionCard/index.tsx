import React from "react";
import styles from "./SelectionCard.module.css";

interface SelectionCardProps {
  title?: string;
  description?: string;
}

function SelectionCard(props: SelectionCardProps) {
  return (
    <div className="selection-card-div">
      <div
        className={`${styles.cardArea} relative selection-card-area bg-[url('/images/createshipping.png')] bg-cover hover:cursor-pointer w-[300px] h-[450px] rounded-[8px] justify-center`}
      >
        <div
          className={`text-area flex-col absolute bottom-0 w-full bg-slate-300 bg-opacity-70`}
        >
          <div className="title-div px-2 py-1 font-medium text-[25px] justify-center">
            <h1>{props.title}</h1>
          </div>
          <div className="description-div px-2 py-4 font-medium text-[15px] justify-center">
            <h1>{props.description}</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SelectionCard;
