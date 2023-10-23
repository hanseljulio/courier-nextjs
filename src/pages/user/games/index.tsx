import React, { useState, useEffect } from "react";
import UserNav from "@/components/UserNav";
import UserHeader from "@/components/HeaderSection";
import { useStoreLoginPersist } from "@/store/store";
import GameCard from "@/components/GameCard";
import { BASE_URL } from "@/constants/constants";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Games() {
  const stateLoginPersist = useStoreLoginPersist();

  const [chances, setChances] = useState<number>(0);
  const [moneyArray, setMoneyArray] = useState<number[]>([]);
  const [clicks, setClicks] = useState<number>(0);

  const randomMoney = () => {
    return Math.floor(Math.random() * (500000 - 1000 + 1) + 1000);
  };

  const currencyConverter = (money: number): string => {
    return money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const getChances = async () => {
    try {
      const response = await fetch(`${BASE_URL}/users/${stateLoginPersist.id}`);
      const result = await response.json();

      setChances(result.gameCount);

      let randomMoneyArray = [];
      for (let i = 0; i < 9; i++) {
        let zeroChance = Math.random() * 100;

        if (zeroChance < 75) {
          randomMoneyArray.push(0);
        } else {
          let currentMoney = randomMoney();
          randomMoneyArray.push(currentMoney);
        }
      }
      setMoneyArray(randomMoneyArray);
    } catch (e) {
      console.log(e);
    }
  };

  const removeChance = async () => {
    try {
      const response = await fetch(`${BASE_URL}/users/${stateLoginPersist.id}`);
      const result = await response.json();

      result.gameCount--;

      setChances(result.gameCount);

      await axios.patch(`${BASE_URL}/users/${stateLoginPersist.id}`, result);
    } catch (e) {
      console.log(e);
    }
  };

  const addMoney = async (moneyToAdd: number) => {
    try {
      const response = await fetch(`${BASE_URL}/users/${stateLoginPersist.id}`);
      const result = await response.json();

      const walletResponse = await fetch(
        `${BASE_URL}/userWallet/${result.walletId}`
      );
      const walletResult = await walletResponse.json();

      walletResult.balance += moneyToAdd;

      const newTransaction = {
        id: walletResult.history.length + 1,
        date: new Date().toString(),
        amount: moneyToAdd,
        selfReferral: walletResult.history[walletResult.history.length - 1]
          .selfReferral
          ? true
          : false,
      };

      walletResult.history.push(newTransaction);

      await axios.patch(
        `${BASE_URL}/userWallet/${result.walletId}`,
        walletResult
      );
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getChances();
  }, []);

  const clickMessage = (money: number) => {
    setClicks(clicks + 1);
    const gotZero = () => toast("Whoops - try again!");
    const gotMoney = () =>
      toast(`Nice! - You just earned ${currencyConverter(money)}!`);
    if (money === 0) {
      gotZero();
    } else {
      gotMoney();
    }
  };

  return (
    <>
      <div>
        <UserNav currentPage="games" />
        <ToastContainer />
        <div className="header-section pb-8">
          <UserHeader
            title="Games"
            description="Click on the box and see what you might get!"
          />
        </div>
        <div className="games-section">
          <p className="text-[18px] pb-[50px] text-center mobile:pb-[30px] mobile:mx-[20px] mobile:text-[14px]">
            {chances > 0
              ? `You have ${chances} chance(s) left.`
              : `You seem to be out of chances to play. Come back when you have paid for a shipment!`}
          </p>
          {clicks === 9 ? (
            <p className="text-[18px] pb-[50px] text-center">
              Out of boxes. Refresh the page to continue playing!
            </p>
          ) : null}
          <div className="cards-section grid justify-center pb-[100px] grid-cols-[repeat(3,_180px)] grid-rows-[repeat(3,_180px)] mobile:scale-[0.8] mobile:grid-cols-[repeat(3,_150px)] mobile:grid-rows-[repeat(3,_150px)] mobile:mr-9">
            {moneyArray.map((money, index) => (
              <GameCard
                key={index}
                money={money}
                chances={chances}
                removeChance={removeChance}
                addMoney={addMoney}
                clickMessage={clickMessage}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Games;
