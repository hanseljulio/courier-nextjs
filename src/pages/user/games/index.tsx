import React, { useEffect } from "react";
import UserNav from "@/components/UserNav";
import UserHeader from "@/components/HeaderSection";

function Games() {
  return (
    <div>
      <UserNav currentPage="shipping" />
      <div className="header-section pb-8">
        <UserHeader title="Games" description="Win discount vouchers!" />
      </div>
    </div>
  );
}

export default Games;
