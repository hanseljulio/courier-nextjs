import React, { useState, useEffect } from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { useStoreLoginPersist } from "@/store/store";
import Link from "next/link";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from "@/constants/constants";
import styles from "@/styles/Login.module.css";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const stateLoginPersist = useStoreLoginPersist();
  const router = useRouter();

  const loginFailMessage = () =>
    toast("User not found or password is incorrect");

  useEffect(() => {
    if (stateLoginPersist.id !== 0 && stateLoginPersist.isAdmin) {
      router.replace("/admin");
    } else if (stateLoginPersist.id !== 0 && !stateLoginPersist.isAdmin) {
      router.replace("/user");
    } else {
      stateLoginPersist.setId(0);
      stateLoginPersist.setIsAdmin(false);
    }
  }, []);

  const submit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${BASE_URL}/auth/login?email=${email}&password=${password}`
      );
      const result = await response.json();

      for (let i = 0; i < result.length; i++) {
        if (
          result[i].email === email &&
          result[i].password === password &&
          result[i].role === "admin"
        ) {
          stateLoginPersist.setId(result[i].id);
          stateLoginPersist.setIsAdmin(true);
          router.push("/admin");
          return;
        } else if (
          result[i].email === email &&
          result[i].password === password &&
          result[i].role === "user"
        ) {
          stateLoginPersist.setId(result[i].id);
          stateLoginPersist.setIsAdmin(false);
          router.push("/user");
          return;
        }
      }

      loginFailMessage();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="admin-login-div min-h-screen bg-amber-400 relative">
      <ToastContainer />
      <div
        className={`${styles.popout} w-[500px] h-[600px] bg-slate-200 absolute drop-shadow-lg m-auto top-0 bottom-0 right-0 left-0 rounded-[30px] mobile:w-[350px] mobile:h-[550px]`}
      >
        <div className="admin-login-titles pb-8 text-center py-[80px]">
          <h1 className="text-2xl font-3xl">Courier Login</h1>
        </div>
        <div className="admin-login-form items-center flex justify-center">
          <form action="" onSubmit={submit}>
            <Input
              label="Email"
              type="email"
              name="userEmail"
              styling="pb-5 mobile:scale-[0.9]"
              required={true}
              width="w-[300px]"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              label="Password"
              type="password"
              name="userPassword"
              styling="pb-10 mobile:scale-[0.9]"
              required={true}
              width="w-[300px]"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              text="Login"
              styling="bg-blue-400 p-3 rounded-[8px] w-full my-6 hover:bg-blue-600 mobile:scale-[0.9]"
            />
          </form>
        </div>
        <p className="text-center mobile:scale-[0.9]">
          Don&apos;t have an account?{" "}
          <span className="font-bold hover:cursor-pointer">
            <Link href="/register">Register here</Link>
          </span>
        </p>
      </div>
    </div>
  );
}
