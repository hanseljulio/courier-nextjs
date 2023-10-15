import React from "react";
import UserNav from "@/components/UserNav";
import UserHeader from "@/components/HeaderSection";

function TopUp() {
  return (
    <div>
      <UserNav currentPage="topup" />
      <div className="header-section pb-8">
        <UserHeader title="Top Up" description="Add your balance here!" />
      </div>
    </div>
  );
}

export default TopUp;
