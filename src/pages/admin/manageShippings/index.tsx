import React, { useState, useEffect } from "react";
import AdminNav from "@/components/AdminNav";
import Input from "@/components/Input";
import ShippingTableHead from "@/components/ShippingTableHead";
import { IShippingData } from "@/types/types";
import ShippingTableData from "@/components/ShippingTableData";
import Pagination from "@/components/Pagination";
import { useStoreLoginPersist } from "@/store/store";
import { BASE_URL } from "@/constants/constants";
import provinces from "@/database/provinces.json";

function AdminManageShipping() {
  return (
    <div className="view-earnings-div min-h-screen bg-slate-200">
      <AdminNav />
      <div className="flex justify-between items-center view-earnings-header mx-[200px] py-[18px] pt-[50px]">
        <h1 className="text-[30px] font-medium">Manage Shipping</h1>
        <Input
          label=""
          type="text"
          name="search"
          styling="mr-[115px]"
          width="w-[300px]"
          placeholder="Search shipping description here"
        />
      </div>
      <div className="view-earnings-content pt-[30px]">
        <div className="table-section ml-[200px] mr-[315px]">
          <table className="table-area w-full">
            <tbody>
              <ShippingTableHead adminMode />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminManageShipping;
