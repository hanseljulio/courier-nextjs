import React, { useState, useEffect } from "react";
import UserNav from "@/components/UserNav";
import TableHead from "@/components/TableHead";
import TableData from "@/components/TableData";
import Pagination from "@/components/Pagination";
import { useStoreLoginPersist } from "@/store/store";
import { BASE_URL } from "@/constants/constants";
import { IAddress } from "@/types/types";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditAddress from "../../../../components/EditAddress";
import axios from "axios";
import Input from "@/components/Input";
import WarningModal from "@/components/WarningModal";
import Dropdown from "@/components/Dropdown/Dropdown";
import Head from "next/head";

function ManageAddress() {
  const stateLoginPersist = useStoreLoginPersist();
  const [addressData, setAddressData] = useState<IAddress[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [count, setCount] = useState<number>(0);
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [currentAddressId, setCurrentAddressId] = useState<string>("");
  const [currentSelectedId, setCurrentSelectedId] = useState<number>(0);
  const [search, setSearch] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("");

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

      if (sortBy === "Address - ASC") {
        const sortedArray = addressResult.addressList.sort(function (
          a: IAddress,
          b: IAddress
        ) {
          return a.address.localeCompare(b.address);
        });

        setAddressData(
          sortedArray.slice((currentPage - 1) * 5, currentPage * 5)
        );
      } else if (sortBy === "Address - DESC") {
        const sortedArray = addressResult.addressList.sort(function (
          a: IAddress,
          b: IAddress
        ) {
          return b.address.localeCompare(a.address);
        });

        setAddressData(
          sortedArray.slice((currentPage - 1) * 5, currentPage * 5)
        );
      } else if (sortBy === "City - ASC") {
        const sortedArray = addressResult.addressList.sort(function (
          a: IAddress,
          b: IAddress
        ) {
          return a.city.localeCompare(b.city);
        });

        setAddressData(
          sortedArray.slice((currentPage - 1) * 5, currentPage * 5)
        );
      } else if (sortBy === "City - DESC") {
        const sortedArray = addressResult.addressList.sort(function (
          a: IAddress,
          b: IAddress
        ) {
          return b.city.localeCompare(a.city);
        });

        setAddressData(
          sortedArray.slice((currentPage - 1) * 5, currentPage * 5)
        );
      } else if (sortBy === "Province - ASC") {
        const sortedArray = addressResult.addressList.sort(function (
          a: IAddress,
          b: IAddress
        ) {
          return a.province.localeCompare(b.province);
        });

        setAddressData(
          sortedArray.slice((currentPage - 1) * 5, currentPage * 5)
        );
      } else if (sortBy === "Province - DESC") {
        const sortedArray = addressResult.addressList.sort(function (
          a: IAddress,
          b: IAddress
        ) {
          return b.province.localeCompare(a.province);
        });

        setAddressData(
          sortedArray.slice((currentPage - 1) * 5, currentPage * 5)
        );
      } else if (sortBy === "Zip - ASC") {
        const sortedArray = addressResult.addressList.sort(function (
          a: IAddress,
          b: IAddress
        ) {
          return parseInt(a.zip) - parseInt(b.zip);
        });

        setAddressData(
          sortedArray.slice((currentPage - 1) * 5, currentPage * 5)
        );
      } else if (sortBy === "Zip - DESC") {
        const sortedArray = addressResult.addressList.sort(function (
          a: IAddress,
          b: IAddress
        ) {
          return parseInt(b.zip) - parseInt(a.zip);
        });

        setAddressData(
          sortedArray.slice((currentPage - 1) * 5, currentPage * 5)
        );
      } else {
        setAddressData(
          addressResult.addressList.slice(
            (currentPage - 1) * 5,
            currentPage * 5
          )
        );
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getAddressData();
  }, [currentPage, search, sortBy]);

  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [addressIdToDelete, setAddressIdToDelete] = useState<number>(0);

  const showDeleteWarning = (id: number) => {
    setAddressIdToDelete(id);
    setShowDeleteModal(true);
  };

  const deleteAddressHelper = async () => {
    await deleteAddress(addressIdToDelete);
  };

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
      setShowDeleteModal(false);
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
          <Head>
            <title>Manage Address</title>
          </Head>
          <UserNav currentPage="address" />
          <ToastContainer />
          <div className="flex justify-between items-center view-earnings-header mx-[350px] pt-[50px] pb-[50px] mobile:flex-col mobile:mx-auto mobile: gap-6">
            <h1 className="text-[30px] text-amber-600 font-medium mt-2">
              Manage Address
            </h1>
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
                <div className="table-section mx-[350px] mobile:scale-[0.95] mobile:mx-auto mobile:overflow-scroll">
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
                          showDelete={showDeleteWarning}
                        />
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="flex justify-center pagination-section mx-[350px] pt-[50px] pb-[150px] mobile:mx-auto">
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

      {showDeleteModal && (
        <WarningModal
          problem="This address will be deleted permanently."
          solution="There's no going back. Are you sure you want to proceed?"
          solutionBtn="Delete Address"
          redirectFunction={deleteAddressHelper}
          exitFunction={() => {
            setShowDeleteModal(false);
          }}
        />
      )}
    </>
  );
}

export default ManageAddress;
