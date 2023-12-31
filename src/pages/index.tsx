import React, { useState, useEffect } from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { useRouter } from "next/router";
import styles from "@/styles/Login.module.css";
import { useStoreLoginPersist } from "@/store/store";
import Head from "next/head";

export default function Home() {
  const router = useRouter();

  const stateLoginPersist = useStoreLoginPersist();

  useEffect(() => {
    if (stateLoginPersist.id !== 0 && stateLoginPersist.isAdmin) {
      router.replace("/admin");
    } else if (stateLoginPersist.id !== 0 && !stateLoginPersist.isAdmin) {
      router.replace("/user");
    }
  }, []);

  const redirectLogin = () => {
    router.push("/login");
  };

  const redirectRegister = () => {
    router.push("/register");
  };

  return (
    <div className="admin-login-div min-h-screen bg-amber-300 relative">
      <Head>
        <title>Welcome to Courier!</title>
        <meta name="description" content="Get started with Courier!" />
      </Head>
      <div
        className={`${styles.popout} text-center main-section w-[600px] h-[450px] m-auto drop-shadow-lg bg-slate-50 rounded-[30px] absolute top-0 right-0 bottom-0 left-0 mobile:w-[80%] mobile:h-[550px]`}
      >
        <h1 className="font-bold text-[40px] pt-8 pb-5">
          Welcome to <span className="text-amber-500">Courier!</span>
        </h1>
        <p className="text-[25px] mobile:text-[18px] py-2">
          For all your <span className="text-amber-500">shipping</span> needs.
        </p>
        <p className="mobile:mx-10">
          Need to ship something? Courier is ready to help!
        </p>

        <h1 className="pt-[50px]">To get started, make your choice:</h1>

        <div className="btn-section flex gap-8 justify-center pt-[90px] mobile:flex-col mobile:pt-[40px]">
          <Button
            text="Login"
            onClick={redirectLogin}
            styling="bg-amber-400 p-3 rounded-[8px] w-[150px] hover:bg-amber-500 mobile:scale-[0.9]"
          />

          <Button
            text="Register"
            onClick={redirectRegister}
            styling="bg-amber-400 p-3 rounded-[8px] w-[150px] hover:bg-amber-500 mobile:scale-[0.9]"
          />
        </div>
      </div>
    </div>
  );
}
