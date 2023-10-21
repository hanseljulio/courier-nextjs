import React, { useState, useEffect } from "react";
import AdminNav from "@/components/AdminNav";
import TableHead from "@/components/TableHead";
import TableData from "@/components/TableData";
import { IUserAddress } from "@/types/types";
import { BASE_URL } from "@/constants/constants";
import Pagination from "@/components/Pagination";

function AdminViewAddress() {
  const [addressData, setAddressData] = useState<IUserAddress[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [count, setCount] = useState<number>(0);

  const getAddressData = async () => {
    const response = await fetch(`${BASE_URL}/userAddress`);
    const result = await response.json();

    let totalLength = 0;

    for (let i = 0; i < result.length; i++) {
      totalLength += result[i].addressList.length;
    }

    setCount(totalLength);

    setAddressData(result.slice((currentPage - 1) * 5, currentPage * 5));
  };

  const movePage = (pageNum: number) => {
    setCurrentPage(pageNum);
  };

  useEffect(() => {
    getAddressData();
  }, [currentPage]);

  return (
    <div className="view-earnings-div min-h-screen bg-slate-200">
      <AdminNav />
      <div className="flex justify-between view-earnings-header mx-[200px] py-[18px] pt-[50px]">
        <h1 className="text-[30px] font-medium">View Adresses</h1>
      </div>
      <div className="view-earnings-content pt-[30px]">
        <div className="table-section ml-[200px] mr-[315px]">
          <table className="table-area w-full">
            <tbody>
              <TableHead adminMode />

              {addressData.map((data) => {
                const userId = data.userId;
                const addressList = data.addressList;

                return (
                  <>
                    {addressList.map((addressData, index) => {
                      return (
                        <TableData
                          key={index}
                          index={1}
                          id={userId}
                          address={addressData.id.toString()}
                          city={addressData.address}
                          province={addressData.city}
                          zip={addressData.province}
                          extra={addressData.zip}
                        />
                      );
                    })}
                  </>
                );
              })}
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

{
  /* <TableData
  index={1}
  id={1}
  address="1"
  city="Istana Merdeka"
  province="Jakarta Pusat"
  zip="DKI Jakarta"
  extra="12345"
/> */
}

export default AdminViewAddress;
