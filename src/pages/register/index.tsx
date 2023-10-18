import React, { useState } from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Link from "next/link";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from "@/constants/constants";

function UserRegister() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [referralCode, setReferralCode] = useState<string>("");

  const router = useRouter();

  const validPhoneNumber = (phone: string) => {
    return /^(^\+62|62|^08)(\d{3,4}-?){2}\d{3,4}$/.test(phone);
  };

  const successMessage = () => toast("Registration success! Redirecting...");
  const invalidPhoneMessage = () =>
    toast("Invalid phone format! Start with +62 or 0 for your phone number.");

  const submit = async (e: any) => {
    e.preventDefault();

    if (!validPhoneNumber(phoneNumber)) {
      invalidPhoneMessage();
      return;
    }

    const referralId = Math.floor(Math.random() * 99999 - 10000) + 10000;
    const randomId = Math.floor(Math.random() * 99999 - 10000) + 10000;
    const randomReferral = Math.random().toString(36).substring(2, 8);

    const newUser = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: randomId,
        email: email,
        password: password,
        fullname: fullName,
        phone: phoneNumber,
        photo: "",
        referral: referralCode,
        referralSelfId: `referral-${referralId}`,
        walletId: `wallet-${referralId}`,
        addressId: `address-${referralId}`,
        shippingId: `shipping-${referralId}`,
        role: "user",
      }),
    };

    const newReferral = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: `referral-${referralId}`,
        userId: randomId,
        referral: randomReferral,
      }),
    };

    const newWallet = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: `wallet-${referralId}`,
        userId: randomId,
        balance: 0,
        history: [],
      }),
    };

    const newAddress = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: `address-${referralId}`,
        userId: randomId,
        addressList: [],
      }),
    };

    const newShipping = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: `shipping-${referralId}`,
        userId: randomId,
        shippingList: [],
      }),
    };

    try {
      const response = await fetch(`${BASE_URL}/users`, newUser);

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const referralResponse = await fetch(
        `${BASE_URL}/referralCodes`,
        newReferral
      );

      if (!referralResponse.ok) {
        throw new Error(response.statusText);
      }

      const walletResponse = await fetch(`${BASE_URL}/userWallet`, newWallet);

      if (!walletResponse.ok) {
        throw new Error(response.statusText);
      }

      const addressResponse = await fetch(
        `${BASE_URL}/userAddress`,
        newAddress
      );

      if (!addressResponse.ok) {
        throw new Error(response.statusText);
      }

      const shippingResponse = await fetch(
        `${BASE_URL}/userShipping`,
        newShipping
      );

      if (!shippingResponse.ok) {
        throw new Error(response.statusText);
      }

      setTimeout(() => {
        router.push("/");
      }, 3000);

      successMessage();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="admin-login-div min-h-screen ">
      <div className="admin-login-titles pb-8 text-center py-[100px]">
        <h1 className="text-2xl font-3xl">Courier Register</h1>
      </div>
      <div className="admin-login-form items-center flex justify-center">
        <ToastContainer />
        <form action="" onSubmit={submit}>
          <Input
            label="Email"
            type="email"
            name="registerEmail"
            styling="pb-5"
            width="w-[300px]"
            required={true}
            placeholder="email@email.com"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="Password"
            type="password"
            name="registerPassword"
            styling="pb-5"
            width="w-[300px]"
            required={true}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            label="Full Name"
            type="text"
            name="registerFullName"
            styling="pb-5"
            width="w-[300px]"
            required={true}
            onChange={(e) => setFullName(e.target.value)}
          />
          <Input
            label="Phone Number"
            type="string"
            name="registerPhoneNumber"
            styling="pb-5"
            placeholder="+6281291345300"
            width="w-[300px]"
            required={true}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <Button
            text="Register"
            styling="bg-blue-400 p-3 rounded-[8px] w-full my-6 hover:bg-blue-600"
          />
        </form>
      </div>
      <p className="text-center">
        Already have an account?{" "}
        <span className="font-bold hover:cursor-pointer">
          <Link href="/">Login here</Link>
        </span>
      </p>
    </div>
  );
}

export default UserRegister;
