import UserHeader from "@/components/HeaderSection";
import UserNav from "@/components/UserNav";
import React from "react";
import SelectionCard from "@/components/SelectionCard";
import styles from "../../../styles/UserPage.module.css";

function UserAddress() {
  return (
    <div>
      <UserNav currentPage="address" />
      <div className="header-section pb-8">
        <UserHeader title="Address" description="Manage your addresses here!" />
      </div>
      <div
        className={`${styles.selectionCardsArea} bg-slate-200 bg-opacity-50 w-full selection-card-area flex justify-center gap-[200px] pt-[60px] pb-[80px]`}
      >
        <SelectionCard
          picture="bg-create-address"
          title="Create Address"
          description="Add a new address here"
        />
        <SelectionCard
          picture="bg-view-address"
          title="Manage Address"
          description="View or edit your addresses here"
        />
      </div>
    </div>
  );
}

export default UserAddress;
