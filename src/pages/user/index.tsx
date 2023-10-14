import React, { useState, useEffect } from "react";
import { useStoreLoginPersist } from "@/store/store";
import { useRouter } from "next/router";
import UserNav from "@/components/UserNav";
import GreetUser from "@/components/GreetUser";

function UserPage() {
  const stateLoginPersist = useStoreLoginPersist();
  const router = useRouter();

  useEffect(() => {
    if (stateLoginPersist.id === 0 || stateLoginPersist.isAdmin) {
      router.push("/error");
    }
  }, []);

  return (
    <div>
      <UserNav currentPage="shipping" />
      <div className="greeting-section">
        <GreetUser />
      </div>
    </div>
  );
}

export default UserPage;
