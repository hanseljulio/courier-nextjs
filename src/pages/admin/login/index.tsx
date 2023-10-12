import React, { useState, useEffect } from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { useStoreLoginPersist } from "@/store/store";

function AdminLogin() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const stateLoginPersist = useStoreLoginPersist();

  useEffect(() => {
    stateLoginPersist.setEmail("");
    stateLoginPersist.setPassword("");
  }, []);

  const submit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:2000/admin");
      const result = await response.json();

      for (let i = 0; i < result.length; i++) {
        if (result[i].email === email && result[i].password === password) {
          alert("Admin verified");
          return;
        }
      }

      alert("User not found");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="admin-login-div min-h-screen bg-slate-300">
      <div className="admin-login-titles pb-8 text-center py-[200px]">
        <h1 className="text-2xl font-3xl">Courier Admin</h1>
      </div>
      <div className="admin-login-form items-center flex justify-center">
        <form action="" onSubmit={submit}>
          <Input
            label="Email"
            type="email"
            name="adminEmail"
            styling="pb-5"
            required={true}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="Password"
            type="password"
            name="adminPassword"
            styling=""
            required={true}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            text="Submit"
            styling="bg-green-500 p-3 rounded-[8px] w-full my-6 hover:bg-green-600"
          />
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
