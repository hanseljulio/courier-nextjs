import React, { useState } from "react";
import UserNav from "@/components/UserNav";
import UserHeader from "@/components/HeaderSection";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function TopUp() {
  const [money, setMoney] = useState<number>(0);

  const errorMessage = () =>
    toast("Money must be between Rp. 10.000 and Rp. 10.000.000!");

  const successMessage = () =>
    toast(`Success! A total of ${money} has been added to your account!`);

  const submit = async (e: any) => {
    e.preventDefault();

    if (money < 10000 || money > 10000000) {
      errorMessage();
      return;
    }

    successMessage();
  };

  return (
    <div>
      <UserNav currentPage="topup" />
      <ToastContainer />
      <div className="header-section pb-8">
        <UserHeader title="Top Up" description="Add your balance here!" />
      </div>
      <div
        className={`mobile:mx-auto your-balance-section mx-[350px] pt-[30px] text-center `}
      >
        <h1 className="text-[25px]">
          Your current balance is:{" "}
          <span className="text-amber-500">Rp. 50.000,00</span>
        </h1>
        <p className="text-center">How much would you like to add?</p>
      </div>
      <div className="top-up-form pt-8">
        <form action="" onSubmit={submit}>
          <div className="form-section items-center flex justify-center">
            <Input
              label=""
              type="number"
              name="topupValue"
              width="w-[300px]"
              required={true}
              onChange={(e) => setMoney(e.target.value)}
            />
          </div>
          <div className="submit-btn items-center flex justify-center pt-4">
            <Button
              text="Add Money"
              styling="p-3 rounded-[8px] w-[300px] my-6 bg-amber-400  hover:bg-amber-500"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default TopUp;
