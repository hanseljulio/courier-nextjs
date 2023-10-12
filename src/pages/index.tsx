import React, { useState, useEffect } from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { useStoreLoginPersist } from "@/store/store";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Home() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const stateLoginPersist = useStoreLoginPersist();
  const router = useRouter();

  useEffect(() => {
    stateLoginPersist.setEmail("");
    stateLoginPersist.setPassword("");
  }, []);

  const submit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:2000/auth/login?email=${email}&password=${password}`
      );
      const result = await response.json();

      for (let i = 0; i < result.length; i++) {
        if (
          result[i].email === email &&
          result[i].password === password &&
          result[i].role === "admin"
        ) {
          router.push("/admin");
        }

        if (
          result[i].email === email &&
          result[i].password === password &&
          result[i].role === "user"
        ) {
          router.push("/user");
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="admin-login-div min-h-screen ">
      <div className="admin-login-titles pb-8 text-center py-[200px]">
        <h1 className="text-2xl font-3xl">Courier Login</h1>
      </div>
      <div className="admin-login-form items-center flex justify-center">
        <form action="" onSubmit={submit}>
          <Input
            label="Email"
            type="email"
            name="userEmail"
            styling="pb-5"
            required={true}
            width="w-[300px]"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="Password"
            type="password"
            name="userPassword"
            styling=""
            required={true}
            width="w-[300px]"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            text="Submit"
            styling="bg-blue-400 p-3 rounded-[8px] w-full my-6 hover:bg-blue-600"
          />
        </form>
      </div>
      <p className="text-center">
        Don&apos;t have an account?{" "}
        <span className="font-bold hover:cursor-pointer">
          <Link href="/register">Register here</Link>
        </span>
      </p>
    </div>
  );
}
