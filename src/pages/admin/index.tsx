import React, { useState, useEffect } from "react";
import { useStoreLoginPersist } from "@/store/store";
import { useRouter } from "next/router";
import AdminNav from "@/components/AdminNav";

function AdminPage() {
  const stateLoginPersist = useStoreLoginPersist();
  const router = useRouter();

  useEffect(() => {
    if (stateLoginPersist.id === 0 || !stateLoginPersist.isAdmin) {
      router.push("/error");
    }
  }, []);

  return (
    <div>
      <AdminNav />
    </div>
  );
}

export default AdminPage;
