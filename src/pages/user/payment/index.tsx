import React from "react";
import UserNav from "@/components/UserNav";
import UserHeader from "@/components/HeaderSection";

function Payment() {
  return (
    <div>
      <UserNav currentPage="payment" />
      <div className="header-section pb-8">
        <UserHeader title="Payment" description="Handle your payments here!" />
      </div>
    </div>
  );
}

export default Payment;
