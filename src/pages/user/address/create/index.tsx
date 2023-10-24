import React, { useState, useEffect } from "react";
import UserNav from "@/components/UserNav";
import UserHeader from "@/components/HeaderSection";
import Input from "@/components/Input";
import provinces from "@/database/provinces.json";
import cities from "@/database/cities.json";
import Dropdown from "@/components/Dropdown/Dropdown";
import Button from "@/components/Button";
import { BASE_URL } from "@/constants/constants";
import { useStoreLoginPersist } from "@/store/store";
import { useRouter } from "next/router";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Head from "next/head";

interface IProvince {
  province_id: string;
  province: string;
}

function CreateAddress() {
  const [provinceList, setProvinceList] = useState<IProvince[]>([]);
  const [provinceId, setProvinceId] = useState<string>("");
  const [cityList, setCityList] = useState<string[]>([]);
  const [zipCodeList, setZipCodeList] = useState<string[]>([]);
  const [currentAddress, setCurrentAddress] = useState<string>("");
  const [currentProvince, setCurrentProvince] = useState<string>("");
  const [currentCity, setCurrentCity] = useState<string>("");
  const [currentZipCode, setCurrentZipCode] = useState<string>("");

  const stateLoginPersist = useStoreLoginPersist();
  const router = useRouter();

  const successMessage = () => toast("Address has been successfully added!");

  const getProvinceData = () => {
    setProvinceList(provinces.provinces);
  };

  const provinceChange = (newId: string) => {
    setProvinceId(newId);
    setCurrentProvince(provinces.provinces[parseInt(newId) - 1].province);

    let firstTime = false;

    const newCityList = [];
    const newZipCodeList = [];

    for (let i = 0; i < cities.cities.length; i++) {
      if (cities.cities[i].province_id === newId) {
        if (!firstTime) {
          setCurrentCity(cities.cities[i].city_name);
          setCurrentZipCode(cities.cities[i].postal_code);
          firstTime = true;
        }

        newCityList.push(cities.cities[i].city_name);
        newZipCodeList.push(cities.cities[i].postal_code);
      }
    }

    setCityList(newCityList);
    setZipCodeList(newZipCodeList);
  };

  useEffect(() => {
    if (stateLoginPersist.id === 0 || stateLoginPersist.isAdmin) {
      router.push("/error");
    }

    if (provinceId === "") {
      provinceChange("1");
    }
    getProvinceData();
  }, [provinceId]);

  const submit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await fetch(`${BASE_URL}/users/${stateLoginPersist.id}`);
      const result = await response.json();

      const addressResponse = await fetch(
        `${BASE_URL}/userAddress/${result.addressId}`
      );
      const addressResult = await addressResponse.json();

      const adminResponse = await fetch(`${BASE_URL}/adminAddress`);
      const adminResult = await adminResponse.json();

      addressResult.addressList.push({
        id:
          addressResult.addressList[addressResult.addressList.length - 1].id +
          1,
        address: currentAddress,
        city: currentCity,
        province: currentProvince,
        zip: currentZipCode,
        adminId: adminResult[adminResult.length - 1].id + 1,
      });

      const newAdminAddress = {
        id: adminResult[adminResult.length - 1].id + 1,
        userId: stateLoginPersist.id,
        address: currentAddress,
        province: currentProvince,
        city: currentCity,
        zip: currentZipCode,
      };

      await axios.patch(
        `${BASE_URL}/userAddress/${result.addressId}`,
        addressResult
      );

      await axios.post(`${BASE_URL}/adminAddress`, newAdminAddress);

      successMessage();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <Head>
        <title>Create New Address</title>
      </Head>
      <UserNav currentPage="address" />
      <ToastContainer />
      <div className="header-section pb-8">
        <UserHeader title="Create Address" />
      </div>
      <div className="address-form flex justify-center">
        <form action="" onSubmit={submit}>
          <div className="address-section pb-8">
            <Input
              label="Address Line"
              type="text"
              name="addressLine"
              width="w-[1150px] mobile:w-[350px]"
              onChange={(e) => setCurrentAddress(e.target.value)}
              required
            />
          </div>
          <div className="wrapper-section flex justify-between mobile:flex-col mobile: gap-8">
            <Dropdown
              label="Province"
              labelStyle="font-bold pb-2"
              width="w-[300px] mobile:w-full"
              options={provinceList}
              provinceChange={provinceChange}
            />
            <Dropdown
              label="City"
              labelStyle="font-bold pb-2"
              width="w-[300px] mobile:w-full"
              options={cityList}
              onChange={(e) => setCurrentCity(e)}
            />
            <Dropdown
              label="Zip Code"
              labelStyle="font-bold pb-2"
              width="w-[300px] mobile:w-full"
              options={zipCodeList}
              onChange={(e) => setCurrentZipCode(e)}
            />
          </div>
          <div className="submit-btn flex justify-center pt-[100px]">
            <Button
              text="Add New Address"
              styling="p-4 mb-[50px] bg-amber-400 rounded-[10px] w-[200px] hover:bg-amber-500"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateAddress;
