import React, { useState, useEffect } from "react";
import UserNav from "@/components/UserNav";
import UserHeader from "@/components/HeaderSection";
import TableHead from "@/components/TableHead";
import TableData from "@/components/TableData";
import Pagination from "@/components/Pagination";
import { useStoreLoginPersist } from "@/store/store";
import { BASE_URL } from "@/constants/constants";
import { IAddress } from "@/types/types";

function ManageAddress() {
  const stateLoginPersist = useStoreLoginPersist();
  const [addressData, setAddressData] = useState<IAddress[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [count, setCount] = useState<number>(0);
  const [size, setSize] = useState<number>(0);

  const movePage = (pageNum: number) => {
    setCurrentPage(pageNum);
  };

  const getAddressData = async () => {
    try {
      const response = await fetch(`${BASE_URL}/users/${stateLoginPersist.id}`);
      const result = await response.json();

      const addressResponse = await fetch(
        `${BASE_URL}/userAddress/${result.addressId}`
      );
      const addressResult = await addressResponse.json();
      setSize(addressResult.addressList.length);

      setAddressData(
        addressResult.addressList.slice((currentPage - 1) * 5, currentPage * 5)
      );
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getAddressData();
  }, [currentPage]);

  return (
    <div>
      <UserNav currentPage="address" />
      <div className="header-section pb-8">
        <UserHeader title="Manage Address" />
      </div>
      <div className="content-wrapper">
        {addressData.length === 0 ? (
          <h1 className="text-center font-medium text-[25px]">
            Nothing to see here! Go and add a new address!
          </h1>
        ) : (
          <div className="content">
            <div className="table-section mx-[350px] mobile:mx-auto mobile:overflow-scroll">
              <table className="table-area w-full">
                <tbody>
                  <TableHead />
                  {addressData.map((data, index) => (
                    <TableData
                      key={index}
                      index={index + 1}
                      id={data.id}
                      address={data.address}
                      city={data.city}
                      province={data.province}
                      zip={data.zip}
                    />
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-center pagination-section mx-[350px] pt-[100px] pb-[50px] mobile:mx-auto">
              <Pagination
                page={currentPage}
                count={size}
                size={5}
                movePage={movePage}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ManageAddress;
