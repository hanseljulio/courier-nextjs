import React, { useState } from "react";
import UserNav from "@/components/UserNav";
import UserHeader from "@/components/HeaderSection";
import TableHead from "@/components/TableHead";
import TableData from "@/components/TableData";

function ManageAddress() {
  return (
    <div>
      <UserNav currentPage="address" />
      <div className="header-section pb-8">
        <UserHeader title="Manage Address" />
      </div>
      <div className="table-section mx-[350px] mobile:mx-auto mobile:overflow-scroll">
        <table className="table-area w-full">
          <tbody>
            <TableHead />
            <TableData
              index={1}
              id={1}
              address="Jalan Mega Kuningan Barat III Lot 10.1-6, RT.3/RW.3"
              city="Jakarta Selatan"
              province="DKI Jakarta"
              zip="12230"
            />
            <TableData
              index={2}
              id={2}
              address="Jalan Mega Kuningan Barat III Lot 10.1-6, RT.3/RW.3"
              city="Jakarta Selatan"
              province="DKI Jakarta"
              zip="12230"
            />
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManageAddress;
