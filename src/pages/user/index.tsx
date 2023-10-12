import React, { useState, useEffect } from "react";
import { useStoreLoginPersist } from "@/store/store";
import { useRouter } from "next/router";
import UserNav from "@/components/UserNav";

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
      <UserNav />
    </div>
  );
}

export default UserPage;
