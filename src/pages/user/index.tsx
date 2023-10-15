import React, { useState, useEffect } from "react";
import { useStoreLoginPersist } from "@/store/store";
import { useRouter } from "next/router";
import UserNav from "@/components/UserNav";
import GreetUser from "@/components/GreetUser";
import SelectionCard from "@/components/SelectionCard";
import styles from "../../styles/UserPage.module.css";

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
      <div className="greeting-section pb-8">
        <GreetUser />
      </div>
      <div
        className={`${styles.selectionCardsArea} bg-slate-200 bg-opacity-50 w-full selection-card-area flex justify-center gap-[200px] pt-[60px] pb-[80px]`}
      >
        <SelectionCard
          picture="bg-create-shipping"
          title="Create Shipping"
          description="Create your shipping label here"
        />
        <SelectionCard
          picture="bg-view-shipping"
          title="View Shipping"
          description="See a list of your shippings"
        />
      </div>
    </div>
  );
}

export default UserPage;
