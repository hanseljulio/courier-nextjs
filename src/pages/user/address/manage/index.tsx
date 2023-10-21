import React, { useState, useEffect } from "react";
import UserNav from "@/components/UserNav";
import UserHeader from "@/components/HeaderSection";
import TableHead from "@/components/TableHead";
import TableData from "@/components/TableData";
import Pagination from "@/components/Pagination";
import { useStoreLoginPersist } from "@/store/store";
import { BASE_URL } from "@/constants/constants";
import { IAddress } from "@/types/types";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditAddress from "./EditAddress";
import axios from "axios";
import Input from "@/components/Input";

function ManageAddress() {
  const stateLoginPersist = useStoreLoginPersist();
  const [addressData, setAddressData] = useState<IAddress[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [count, setCount] = useState<number>(0);
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [currentAddressId, setCurrentAddressId] = useState<string>("");
  const [currentSelectedId, setCurrentSelectedId] = useState<number>(0);
  const [search, setSearch] = useState<string>("");

  const deleteMessage = () => toast("Address successfully deleted!");

  const movePage = (pageNum: number) => {
    setCurrentPage(pageNum);
  };

  const editOff = () => {
    setShowEdit(false);
    getAddressData();
  };

  const editOn = (id: number) => {
    setCurrentSelectedId(id);
    setShowEdit(true);
  };

  const getAddressData = async () => {
    try {
      const response = await fetch(`${BASE_URL}/users/${stateLoginPersist.id}`);
      const result = await response.json();

      setCurrentAddressId(result.addressId);

      const addressResponse = await fetch(
        `${BASE_URL}/userAddress/${result.addressId}?addressList.address=${search}`
      );
      const addressResult = await addressResponse.json();

      const filteredArray = addressResult.addressList.filter(
        (data: IAddress) => {
          return data.address.toLowerCase().includes(search);
        }
      );

      addressResult.addressList = filteredArray;
      setCount(addressResult.addressList.length);

      setAddressData(
        addressResult.addressList.slice((currentPage - 1) * 5, currentPage * 5)
      );
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getAddressData();
  }, [currentPage, search]);

  const deleteAddress = async (id: number) => {
    try {
      const addressResponse = await fetch(
        `${BASE_URL}/userAddress/${currentAddressId}`
      );

      const addressResult = await addressResponse.json();

      let adminIdToDelete = 0;

      for (let i = 0; i < addressResult.addressList.length; i++) {
        if (addressResult.addressList[i].id === id) {
          adminIdToDelete = addressResult.addressList[i].adminId;
          break;
        }
      }

      const updatedAddressList = addressResult.addressList.filter(
        (data: any) => {
          return data.id !== id;
        }
      );

      addressResult.addressList = updatedAddressList;

      await axios.patch(
        `${BASE_URL}/userAddress/${currentAddressId}`,
        addressResult
      );

      await axios.delete(`${BASE_URL}/adminAddress/${adminIdToDelete}`);

      deleteMessage();
      getAddressData();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      {showEdit ? (
        <EditAddress
          exitEditFunction={editOff}
          addressId={currentAddressId}
          selectedId={currentSelectedId}
        />
      ) : (
        <div>
          <UserNav currentPage="address" />
          <ToastContainer />
          <div className="header-section flex items-center pb-8 mobile:flex-col">
            <UserHeader title="Manage Address" />
            <Input
              label=""
              type="text"
              name="search"
              styling="mt-8 ml-[340px] mobile:mx-auto"
              width="w-[300px]"
              placeholder="Search address here"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="content-wrapper">
            {addressData.length === 0 ? (
              <h1 className="text-center font-medium text-[25px]">
                Nothing to see here!
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
                          editFunction={editOn}
                          deleteFunction={deleteAddress}
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
      )}
    </>
  );
}

export default ManageAddress;
