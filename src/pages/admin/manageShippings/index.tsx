import React, { useState, useEffect } from "react";
import AdminNav from "@/components/AdminNav";
import Input from "@/components/Input";
import AdminShippingTableHead from "@/components/AdminShippingTableHead";
import { IAdminShipping, IShippingData } from "@/types/types";
import Pagination from "@/components/Pagination";
import { useStoreLoginPersist } from "@/store/store";
import { BASE_URL } from "@/constants/constants";
import Head from "next/head";
import AdminShippingTableData from "@/components/AdminShippingTableData";
import Dropdown from "@/components/Dropdown/Dropdown";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

function AdminManageShipping() {
  const stateLoginPersist = useStoreLoginPersist();
  const [shippingData, setShippingData] = useState<IAdminShipping[]>([]);
  const [search, setSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [count, setCount] = useState<number>(0);
  const [currentShippingId, setCurrentShippingId] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("");

  const router = useRouter();

  const deleteMessage = () => toast("Shipment successfully deleted!");

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
    if (stateLoginPersist.id !== 0 && !stateLoginPersist.isAdmin) {
      router.replace("/error");
    }

    getShippingData();
  }, [search, currentPage, sortBy]);

  const deleteShipping = async (adminId: number, userId: number) => {
    try {
      await axios.delete(`${BASE_URL}/adminShipping/${adminId}`);

      const userResponse = await fetch(`${BASE_URL}/users/${userId}`);
      const userResult = await userResponse.json();

      const response = await fetch(
        `${BASE_URL}/userShipping/${userResult.shippingId}`
      );
      const result = await response.json();

      const updatedArray = result.shippingList.filter((data: IShippingData) => {
        return data.adminId !== adminId;
      });

      result.shippingList = updatedArray;

      await axios.patch(
        `${BASE_URL}/userShipping/${userResult.shippingId}`,
        result
      );

      getShippingData();
      deleteMessage();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="view-earnings-div min-h-screen bg-slate-200">
      <Head>
        <title>Admin Manage Shipping</title>
      </Head>
      <AdminNav />
      <ToastContainer />
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
                  destAddress={`${data.destAddress}, ${data.destCity}, ${data.destAddress} ${data.destZip}`}
                  description={`${data.category} - ${
                    data.description ? data.description : "No description"
                  }`}
                  status={data.alreadyPaid}
                  currentStatus={data.status}
                  adminShippingId={data.id}
                  deleteFunction={deleteShipping}
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
