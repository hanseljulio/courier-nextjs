import React, { useState, useEffect } from "react";
import UserNav from "@/components/UserNav";
import UserHeader from "@/components/HeaderSection";
import Input from "@/components/Input";
import ShippingTableHead from "@/components/ShippingTableHead";
import { IShippingData } from "@/types/types";
import ShippingTableData from "@/components/ShippingTableData";
import Pagination from "@/components/Pagination";
import { useStoreLoginPersist } from "@/store/store";
import { BASE_URL } from "@/constants/constants";
import provinces from "@/database/provinces.json";

function ManageShipping() {
  const stateLoginPersist = useStoreLoginPersist();
  const [shippingData, setShippingData] = useState<IShippingData[]>([]);
  const [search, setSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [count, setCount] = useState<number>(0);
  const [currentShippingId, setCurrentShippingId] = useState<string>("");

  const movePage = (pageNum: number) => {
    setCurrentPage(pageNum);
  };

  const dateConverter = (date: Date) => {
    const time = date.toTimeString().substring(0, 5);

    const modifiedDate = date.toUTCString().substring(4, 16);

    return `${time} - ${modifiedDate}`;
  };

  const getShippingData = async () => {
    try {
      const response = await fetch(`${BASE_URL}/users/${stateLoginPersist.id}`);
      const result = await response.json();

      setCurrentShippingId(result.shippingId);

      const shippingResponse = await fetch(
        `${BASE_URL}/userShipping/${result.shippingId}`
      );
      const shippingResult = await shippingResponse.json();

      const filteredArray = shippingResult.shippingList.filter(
        (data: IShippingData) => {
          const mergedDescription = `${data.category} - ${data.description}`;
          return mergedDescription.toLowerCase().includes(search);
        }
      );

      shippingResult.shippingList = filteredArray;
      setCount(shippingResult.shippingList.length);

      setShippingData(
        shippingResult.shippingList.slice(
          (currentPage - 1) * 5,
          currentPage * 5
        )
      );
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getShippingData();
  }, [currentPage, search]);

  const getProvince = (id: string) => {
    return provinces.provinces[parseInt(id) - 1].province;
  };

  return (
    <>
      <div>
        <UserNav currentPage="shipping" />
        <div className="header-section flex items-center pb-8 mobile:flex-col">
          <UserHeader
            title="Manage Shipping"
            description="To pay for a shipping, click on the word 'UNPAID'. Otherwise you're good!"
          />
          <Input
            label=""
            type="text"
            name="search"
            styling="mt-8 ml-[40px] mobile:mx-auto"
            width="w-[300px]"
            placeholder="Search shipping description here"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="content-wrapper">
          {shippingData.length === 0 ? (
            <h1 className="text-center font-medium text-[25px]">
              Nothing to see here!
            </h1>
          ) : (
            <div className="content">
              <div className="table-section mx-[350px] mobile:mx-auto mobile:overflow-scroll">
                <table className="table-area w-full">
                  <tbody>
                    <ShippingTableHead />
                    {shippingData.map((data, index) => (
                      <ShippingTableData
                        key={index}
                        id={data.id}
                        index={data.id}
                        startAddress={`${data.start.address}, ${data.start.city}, ${data.start.province} ${data.start.zip}`}
                        destAddress={`${data.destAddress}, ${
                          data.destCity
                        }, ${getProvince(data.destProvince)} ${data.destZip}`}
                        date={dateConverter(new Date(data.date))}
                        description={`${data.category} - ${
                          data.description ? data.description : "No description"
                        }`}
                        status={data.alreadyPaid}
                        currentStatus={data.status}
                        shippingId={currentShippingId}
                        refresh={getShippingData}
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
          )}
        </div>
      </div>
    </>
  );
}

export default ManageShipping;
