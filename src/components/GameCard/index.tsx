import { useState } from "react";
import styles from "./GameCard.module.css";

interface GameCardProps {
  money: number;
  chances: number;
  removeChance: () => void;
  addMoney: (moneyToAdd: number) => void;
  clickMessage: (money: number) => void;
}

function GameCard(props: GameCardProps) {
  const [showMoney, setShowMoney] = useState<boolean>(false);
  const [color, setColor] = useState<string>(
    "hover:cursor-pointer bg-amber-400"
  );

  const currencyConverter = (money: number): string => {
    return money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const convertedMoney = currencyConverter(props.money as number);

  const handleClick = () => {
    if (!showMoney) {
      setShowMoney(true);
      props.removeChance();
      setColor("bg-[#27AE60]");
      props.clickMessage(props.money);
      if (props.money !== 0) {
        props.addMoney(props.money);
      }
    }
  };

  if (props.chances === 0) {
    setTimeout(() => {
      setShowMoney(false);
    }, 3000);
  }

  return (
    <div className={`${styles.gamecardDiv}`}>
      <div
        style={{
          border:
            props.chances !== 0 ? "1px solid lightgray;" : "3px solid #EB5757",
        }}
        className={`${styles.gamecardArea} w-[150px] h-[150px] ${
          props.chances === 0 ? "bg-[#939393] hover:cursor-default" : color
        }`}
        onClick={(e) => {
          props.chances === 0 ? e.preventDefault() : handleClick();
        }}
      >
        <h1 className="text-[18px] font-bold text-center">
          {showMoney && convertedMoney}
        </h1>
      </div>
    </div>
  );
}

export default GameCard;
