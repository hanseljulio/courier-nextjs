import React, { useEffect } from "react";
import { useStoreLoginPersist } from "@/store/store";
import { useRouter } from "next/router";
import UserNav from "@/components/UserNav";
import GreetUser from "@/components/GreetUser";
import SelectionCard from "@/components/SelectionCard";
import styles from "../../styles/UserPage.module.css";
import Head from "next/head";

function UserPage() {
  const stateLoginPersist = useStoreLoginPersist();
  const router = useRouter();

  const redirectCreateShipping = () => {
    router.push("/user/shipping/create");
  };

  const redirectManageShipping = () => {
    router.push("/user/shipping/manage");
  };

  useEffect(() => {
    if (stateLoginPersist.id === 0 || stateLoginPersist.isAdmin) {
      router.push("/error");
    }
  }, []);

  return (
    <div>
      <Head>
        <title>Shipping</title>
        <meta name="description" content="Ship with Courier!" />
      </Head>
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
          description="Create your new shipping here"
          onClick={redirectCreateShipping}
        />
        <SelectionCard
          picture="bg-view-shipping"
          title="Manage Shipping"
          description="View shipping and make payments"
          onClick={redirectManageShipping}
        />
      </div>
    </div>
  );
}

export default UserPage;
