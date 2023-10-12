import React, { useState } from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Link from "next/link";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  const submit = async (e: any) => {
    e.preventDefault();

    if (!validPhoneNumber(phoneNumber)) {
      alert("Invalid phone format");
      return;
    }

    const newUser = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        fullname: fullName,
        phone: phoneNumber,
        photo: "",
        referral: referralCode,
        role: "user",
      }),
    };

    try {
      const response = await fetch("http://localhost:2000/users", newUser);

      if (!response.ok) {
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
      <div className="admin-login-titles pb-8 text-center py-[120px]">
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
          <Input
            label="Referral code"
            type="text"
            name="registerReferralCode"
            width="w-[300px]"
            styling="pb-5"
            placeholder="Leave it blank if you don't have one"
            onChange={(e) => setReferralCode(e.target.value)}
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
