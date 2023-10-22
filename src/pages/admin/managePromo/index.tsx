import React, { useState, useEffect } from "react";
import AdminNav from "@/components/AdminNav";
import Dropdown from "@/components/Dropdown/Dropdown";
import PromoTableHead from "@/components/PromoTableHead";
import PromoTableData from "@/components/PromoTableData";
import { IVouchers } from "@/types/types";
import { BASE_URL } from "@/constants/constants";
import Pagination from "@/components/Pagination";

function ManagePromo() {
  const [voucherData, setVoucherData] = useState<IVouchers[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [count, setCount] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>("");

  const movePage = (pageNum: number) => {
    setCurrentPage(pageNum);
  };

  const getVoucherData = async () => {
    try {
      const response = await fetch(`${BASE_URL}/userVouchers`);
      const result = await response.json();

      setCount(result.length);

      if (sortBy === "Expiration Date - ASC") {
        const sortedArray = result.sort(function (a: IVouchers, b: IVouchers) {
          return (
            new Date(a.expirationDate).getTime() -
            new Date(b.expirationDate).getTime()
          );
        });

        setVoucherData(
          sortedArray.slice((currentPage - 1) * 5, currentPage * 5)
        );
      } else if (sortBy === "Expiration Date - DESC") {
        const sortedArray = result.sort(function (a: IVouchers, b: IVouchers) {
          return (
            new Date(b.expirationDate).getTime() -
            new Date(a.expirationDate).getTime()
          );
        });

        setVoucherData(
          sortedArray.slice((currentPage - 1) * 5, currentPage * 5)
        );
      } else {
        setVoucherData(result.slice((currentPage - 1) * 5, currentPage * 5));
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getVoucherData();
  }, [currentPage, sortBy]);

  return (
    <div className="manage-promo-div min-h-screen bg-slate-200">
      <AdminNav />
      <div className="flex justify-between items-center manage-promo-header mx-[200px] py-[18px] pt-[50px]">
        <h1 className="text-[30px] font-medium">Manage Promos</h1>
        <Dropdown
          label="Sort by"
          flexLabel="flex items-center gap-8 mr-[115px]"
          labelStyle="font-bold pb-2 pt-2"
          width="w-[300px] mobile:w-full"
          options={["None", "Expiration Date - ASC", "Expiration Date - DESC"]}
          onChange={(e) => setSortBy(e)}
        />
      </div>
      <div className="manage-promo-content pt-[30px]">
        <div className="table-section ml-[200px] mr-[315px]">
          <table className="table-area w-full">
            <tbody>
              <PromoTableHead />
              {voucherData.map((voucher, index) => (
                <PromoTableData
                  key={index}
                  index={index}
                  id={voucher.id}
                  code={voucher.code}
                  description={voucher.description}
                  expirationDate={voucher.expirationDate}
                  refreshFunction={getVoucherData}
                />
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center pagination-section mx-[350px] pt-[100px] pb-[50px] mobile:mx-auto">
          <Pagination
            page={currentPage}
            count={count}
            size={5}
            movePage={movePage}
          />
        </div>
      </div>
    </div>
  );
}

export default ManagePromo;
