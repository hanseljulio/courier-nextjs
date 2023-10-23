import React, { useState, useEffect } from "react";
import AdminNav from "@/components/AdminNav";
import Input from "@/components/Input";
import AdminShippingTableHead from "@/components/AdminShippingTableHead";
import { IAdminShipping } from "@/types/types";
import Pagination from "@/components/Pagination";
import { useStoreLoginPersist } from "@/store/store";
import { BASE_URL } from "@/constants/constants";
import provinces from "@/database/provinces.json";
import AdminShippingTableData from "@/components/AdminShippingTableData";
import Dropdown from "@/components/Dropdown/Dropdown";

function AdminManageShipping() {
  const stateLoginPersist = useStoreLoginPersist();
  const [shippingData, setShippingData] = useState<IAdminShipping[]>([]);
  const [search, setSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [count, setCount] = useState<number>(0);
  const [currentShippingId, setCurrentShippingId] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("");

  const movePage = (pageNum: number) => {
    setCurrentPage(pageNum);
  };

  const getShippingData = async () => {
    try {
      const response = await fetch(`${BASE_URL}/users/${stateLoginPersist.id}`);
      const result = await response.json();

      setCurrentShippingId(result.shippingId);

      const shippingResponse = await fetch(`${BASE_URL}/adminShipping`);
      const shippingResult = await shippingResponse.json();

      const filteredArray = shippingResult.filter((data: IAdminShipping) => {
        const mergedDescription = `${data.category} - ${data.description}`;
        return mergedDescription.toLowerCase().includes(search);
      });

      setCount(filteredArray.length);

      if (sortBy === "Size - ASC") {
        const sortedArray = filteredArray.sort(function (
          a: IAdminShipping,
          b: IAdminShipping
        ) {
          return a.length * a.width * a.height - b.length * b.width * b.height;
        });

        setShippingData(
          sortedArray.slice((currentPage - 1) * 5, currentPage * 5)
        );
      } else if (sortBy === "Size - DESC") {
        const sortedArray = filteredArray.sort(function (
          a: IAdminShipping,
          b: IAdminShipping
        ) {
          return b.length * b.width * b.height - a.length * a.width * a.height;
        });

        setShippingData(
          sortedArray.slice((currentPage - 1) * 5, currentPage * 5)
        );
      } else if (sortBy === "Weight - ASC") {
        const sortedArray = filteredArray.sort(function (
          a: IAdminShipping,
          b: IAdminShipping
        ) {
          return a.weight - b.weight;
        });

        setShippingData(
          sortedArray.slice((currentPage - 1) * 5, currentPage * 5)
        );
      } else if (sortBy === "Weight - DESC") {
        const sortedArray = filteredArray.sort(function (
          a: IAdminShipping,
          b: IAdminShipping
        ) {
          return b.weight - a.weight;
        });

        setShippingData(
          sortedArray.slice((currentPage - 1) * 5, currentPage * 5)
        );
      } else if (sortBy === "Category - ASC") {
        const priority = [
          "Food",
          "Medical Supplies",
          "Others",
          "Personal Items",
        ];
        const sortedArray = filteredArray.sort(function (
          a: IAdminShipping,
          b: IAdminShipping
        ) {
          return priority.indexOf(a.category) - priority.indexOf(b.category);
        });

        setShippingData(
          sortedArray.slice((currentPage - 1) * 5, currentPage * 5)
        );
      } else if (sortBy === "Category - DESC") {
        const priority = [
          "Food",
          "Medical Supplies",
          "Others",
          "Personal Items",
        ];
        const sortedArray = filteredArray.sort(function (
          a: IAdminShipping,
          b: IAdminShipping
        ) {
          return priority.indexOf(b.category) - priority.indexOf(a.category);
        });

        setShippingData(
          sortedArray.slice((currentPage - 1) * 5, currentPage * 5)
        );
      } else if (sortBy === "Payment - Sort by paid") {
        const priority = [true, false];
        const sortedArray = filteredArray.sort(function (
          a: IAdminShipping,
          b: IAdminShipping
        ) {
          return (
            priority.indexOf(a.alreadyPaid) - priority.indexOf(b.alreadyPaid)
          );
        });

        setShippingData(
          sortedArray.slice((currentPage - 1) * 5, currentPage * 5)
        );
      } else if (sortBy === "Payment - Sort by unpaid") {
        const priority = [false, true];
        const sortedArray = filteredArray.sort(function (
          a: IAdminShipping,
          b: IAdminShipping
        ) {
          return (
            priority.indexOf(a.alreadyPaid) - priority.indexOf(b.alreadyPaid)
          );
        });

        setShippingData(
          sortedArray.slice((currentPage - 1) * 5, currentPage * 5)
        );
      } else {
        setShippingData(
          filteredArray.slice((currentPage - 1) * 5, currentPage * 5)
        );
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getShippingData();
  }, [search, currentPage, sortBy]);

  const getProvince = (id: string) => {
    return provinces.provinces[parseInt(id) - 1].province;
  };

  return (
    <div className="view-earnings-div min-h-screen bg-slate-200">
      <AdminNav />
      <div className="flex justify-between items-center view-earnings-header mx-[200px] py-[18px] pt-[50px]">
        <h1 className="text-[30px] font-medium mt-2">Manage Shipping</h1>
        <Dropdown
          label="Sort by"
          flexLabel="flex items-center gap-8 mt-3"
          labelStyle="font-bold pb-2 pt-2"
          width="w-[300px] mobile:w-full"
          onChange={(e) => setSortBy(e)}
          options={[
            "None",
            "Size - ASC",
            "Size - DESC",
            "Weight - ASC",
            "Weight - DESC",
            "Category - ASC",
            "Category - DESC",
            "Payment - Sort by paid",
            "Payment - Sort by unpaid",
          ]}
        />
        <Input
          label=""
          type="text"
          name="search"
          styling="mr-[115px]"
          width="w-[300px]"
          placeholder="Search shipping description here"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="view-earnings-content pt-[30px]">
        <div className="table-section ml-[200px] mr-[315px]">
          <table className="table-area w-full">
            <tbody>
              <AdminShippingTableHead />
              {shippingData.map((data, index) => (
                <AdminShippingTableData
                  key={index}
                  index={index}
                  id={data.id}
                  userId={data.userId}
                  startAddress={`${data.start.address}, ${data.start.city}, ${data.start.province} ${data.start.zip}`}
                  destAddress={`${data.destAddress}, ${
                    data.destCity
                  }, ${getProvince(data.destProvince)} ${data.destZip}`}
                  description={`${data.category} - ${
                    data.description ? data.description : "No description"
                  }`}
                  status={data.alreadyPaid}
                  adminShippingId={data.id}
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
    </div>
  );
}

export default AdminManageShipping;
