import React, { useState, useEffect } from "react";
import AdminNav from "@/components/AdminNav";
import TableHead from "@/components/TableHead";
import TableData from "@/components/TableData";
import { IAdminAddress, IUserAddress } from "@/types/types";
import { BASE_URL } from "@/constants/constants";
import Pagination from "@/components/Pagination";
import Input from "@/components/Input";
import Dropdown from "@/components/Dropdown/Dropdown";

function AdminViewAddress() {
  const [addressData, setAddressData] = useState<IAdminAddress[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [count, setCount] = useState<number>(0);
  const [search, setSearch] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("");

  const getAddressData = async () => {
    try {
      const response = await fetch(`${BASE_URL}/adminAddress`);
      const result = await response.json();

      const filteredArray = result.filter((data: IAdminAddress) => {
        return data.address.toLowerCase().includes(search.toLowerCase());
      });

      setCount(filteredArray.length);

      if (sortBy === "Address - ASC") {
        const sortedArray = filteredArray.sort(function (
          a: IAdminAddress,
          b: IAdminAddress
        ) {
          return a.address.localeCompare(b.address);
        });

        setAddressData(
          sortedArray.slice((currentPage - 1) * 5, currentPage * 5)
        );
      } else if (sortBy === "Address - DESC") {
        const sortedArray = filteredArray.sort(function (
          a: IAdminAddress,
          b: IAdminAddress
        ) {
          return b.address.localeCompare(a.address);
        });

        setAddressData(
          sortedArray.slice((currentPage - 1) * 5, currentPage * 5)
        );
      } else if (sortBy === "City - ASC") {
        const sortedArray = filteredArray.sort(function (
          a: IAdminAddress,
          b: IAdminAddress
        ) {
          return a.city.localeCompare(b.city);
        });

        setAddressData(
          sortedArray.slice((currentPage - 1) * 5, currentPage * 5)
        );
      } else if (sortBy === "City - DESC") {
        const sortedArray = filteredArray.sort(function (
          a: IAdminAddress,
          b: IAdminAddress
        ) {
          return b.city.localeCompare(a.city);
        });

        setAddressData(
          sortedArray.slice((currentPage - 1) * 5, currentPage * 5)
        );
      } else if (sortBy === "Province - ASC") {
        const sortedArray = filteredArray.sort(function (
          a: IAdminAddress,
          b: IAdminAddress
        ) {
          return a.province.localeCompare(b.province);
        });

        setAddressData(
          sortedArray.slice((currentPage - 1) * 5, currentPage * 5)
        );
      } else if (sortBy === "Province - DESC") {
        const sortedArray = filteredArray.sort(function (
          a: IAdminAddress,
          b: IAdminAddress
        ) {
          return b.province.localeCompare(a.province);
        });

        setAddressData(
          sortedArray.slice((currentPage - 1) * 5, currentPage * 5)
        );
      } else if (sortBy === "Zip - ASC") {
        const sortedArray = filteredArray.sort(function (
          a: IAdminAddress,
          b: IAdminAddress
        ) {
          return parseInt(a.zip) - parseInt(b.zip);
        });

        setAddressData(
          sortedArray.slice((currentPage - 1) * 5, currentPage * 5)
        );
      } else if (sortBy === "Zip - DESC") {
        const sortedArray = filteredArray.sort(function (
          a: IAdminAddress,
          b: IAdminAddress
        ) {
          return parseInt(b.zip) - parseInt(a.zip);
        });

        setAddressData(
          sortedArray.slice((currentPage - 1) * 5, currentPage * 5)
        );
      } else {
        setAddressData(
          filteredArray.slice((currentPage - 1) * 5, currentPage * 5)
        );
      }

      setAddressData(
        filteredArray.slice((currentPage - 1) * 5, currentPage * 5)
      );
    } catch (e) {
      console.log(e);
    }
  };

  const movePage = (pageNum: number) => {
    setCurrentPage(pageNum);
  };

  useEffect(() => {
    getAddressData();
  }, [currentPage, search, sortBy]);

  return (
    <div className="view-earnings-div min-h-screen bg-slate-200">
      <AdminNav />
      <div className="flex justify-between items-center view-earnings-header mx-[200px] py-[18px] pt-[50px]">
        <h1 className="text-[30px] font-medium">View Adresses</h1>
        <Dropdown
          label="Sort by"
          flexLabel="flex items-center gap-5 mt-3"
          labelStyle="font-bold pb-2 pt-2"
          width="w-[300px] mobile:w-[200px]"
          onChange={(e) => setSortBy(e)}
          options={[
            "None",
            "Address - ASC",
            "Address - DESC",
            "City - ASC",
            "City - DESC",
            "Province - ASC",
            "Province - DESC",
            "Zip - ASC",
            "Zip - DESC",
          ]}
        />
        <Input
          label=""
          type="text"
          name="search"
          styling="mr-[115px]"
          width="w-[300px]"
          placeholder="Search address here"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="view-earnings-content pt-[30px]">
        <div className="table-section ml-[200px] mr-[315px]">
          <table className="table-area w-full">
            <tbody>
              <TableHead adminMode />

              {addressData.map((data, index) => (
                <TableData
                  key={index}
                  index={index}
                  id={data.id}
                  address={data.userId.toString()}
                  city={data.address}
                  province={data.city}
                  zip={data.province}
                  extra={data.zip}
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

export default AdminViewAddress;
