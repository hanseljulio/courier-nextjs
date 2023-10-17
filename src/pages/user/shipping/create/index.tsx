import React, { useState, useEffect } from "react";
import UserNav from "@/components/UserNav";
import UserHeader from "@/components/HeaderSection";

function CreateShipping() {
  const [showEmptyAddress, setShowEmptyAddress] = useState<boolean>(false);

  return (
    <>
      <div>
        <UserNav currentPage="shipping" />
        <div className="header-section pb-8">
          <UserHeader title="Create Shipping" />
        </div>
      </div>
    </>
  );
}

export default CreateShipping;
