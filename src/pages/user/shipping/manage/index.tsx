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

function ManageShipping() {
  const stateLoginPersist = useStoreLoginPersist();
  const [shippingData, setShippingData] = useState<IShippingData[]>([]);
  const [search, setSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [count, setCount] = useState<number>(0);
  const [currentShippingId, setCurrentShippingId] = useState<string>("");
  const [currentSelectedId, setCurrentSelectedId] = useState<number>(0);

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
          return data.description.includes(search);
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

  return (
    <>
      <div>
        <UserNav currentPage="shipping" />
        <div className="header-section flex items-center pb-8 mobile:flex-col">
          <UserHeader title="Manage Shipping" />
          <Input
            label=""
            type="text"
            name="search"
            styling="mt-8 ml-[340px] mobile:mx-auto"
            width="w-[300px]"
            placeholder="Search shipping here"
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
                    <ShippingTableData
                      id={1}
                      index={1}
                      startAddress="Jalan Mega Kuningan Barat III Lot 10.1-6, RT.3/RW.3"
                      destAddress="Lapangan Medan Merdeka RT.5/RW.2, Kelurahan Gambir, Kecamatan Gambir"
                      date={dateConverter(
                        new Date(
                          "Mon Oct 19 2023 13:43:55 GMT+0700 (Western Indonesia Time)"
                        )
                      )}
                      description="Other - Bomb"
                      status={false}
                    />
                    <ShippingTableData
                      id={2}
                      index={2}
                      startAddress="Jalan Mega Kuningan Barat III Lot 10.1-6, RT.3/RW.3"
                      destAddress="Lapangan Medan Merdeka RT.5/RW.2, Kelurahan Gambir, Kecamatan Gambir"
                      date={dateConverter(
                        new Date(
                          "Mon Oct 19 2023 13:43:55 GMT+0700 (Western Indonesia Time)"
                        )
                      )}
                      description="Other - Bomb"
                      status={true}
                    />
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
