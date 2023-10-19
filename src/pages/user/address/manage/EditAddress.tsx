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
import { IAddress } from "@/types/types";

interface IProvince {
  province_id: string;
  province: string;
}

interface EditAddressProps {
  exitEditFunction: () => void;
  addressId: string;
  selectedId: number;
}

function EditAddress(props: EditAddressProps) {
  const [editData, setEditData] = useState<IAddress>({
    id: 0,
    address: "",
    province: "",
    city: "",
    zip: "",
  });
  const [provinceList, setProvinceList] = useState<IProvince[]>([]);
  const [provinceId, setProvinceId] = useState<string>("1");
  const [cityList, setCityList] = useState<string[]>([]);
  const [zipCodeList, setZipCodeList] = useState<string[]>([]);
  const [currentCity, setCurrentCity] = useState<string>("");
  const [currentZipCode, setCurrentZipCode] = useState<string>("");

  const stateLoginPersist = useStoreLoginPersist();
  const router = useRouter();

  const editSuccessMessage = () =>
    toast("Address has been successfully edited!");

  const getProvinceData = () => {
    setProvinceList(provinces.provinces);
  };

  const provinceChange = (newId: string) => {
    setProvinceId(newId);
    setEditData({
      ...editData,
      province: provinces.provinces[parseInt(newId) - 1].province,
    });

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

  const getAddressData = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/userAddress/${props.addressId}`
      );
      const result = await response.json();

      // PROBLEM: EDITDATA WAS NEVER SET SOMEHOW
      for (let i = 0; i < result.addressList.length; i++) {
        if (result.addressList[i].id === props.selectedId) {
          for (let j = 0; j < provinces.provinces.length; j++) {
            if (
              provinces.provinces[j].province === result.addressList[i].province
            ) {
              provinceChange(provinces.provinces[j].province_id);
              break;
            }
          }
          setEditData(result.addressList[i]);
          break;
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (stateLoginPersist.id === 0 || stateLoginPersist.isAdmin) {
      router.push("/error");
    }

    if (editData.id === 0) {
      getAddressData();
    }
    getProvinceData();
  }, [provinceId]);

  const submit = async (e: any) => {
    e.preventDefault();

    try {
      const addressResponse = await fetch(
        `${BASE_URL}/userAddress/${props.addressId}`
      );
      const addressResult = await addressResponse.json();

      for (let i = 0; i < addressResult.addressList.length; i++) {
        if (addressResult.addressList[i].id === props.selectedId) {
          addressResult.addressList[i] = editData;
          break;
        }
      }

      axios
        .patch(`${BASE_URL}/userAddress/${props.addressId}`, addressResult)
        .then(() => {
          //   props.exitEditFunction();
          editSuccessMessage();
        });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <UserNav currentPage="address" />
      <ToastContainer />
      <div className="header-section pb-8">
        <UserHeader title="Edit Address" />
      </div>
      <div className="address-form flex justify-center">
        <form action="" onSubmit={submit}>
          <div className="address-section pb-8 mobile:flex mobile:justify-center">
            <Input
              label="Address Line"
              type="text"
              name="addressLine"
              width="w-[1150px] mobile:w-[350px]"
              value={editData.address}
              onChange={(e) =>
                setEditData({ ...editData, address: e.target.value })
              }
              required
            />
          </div>
          <div className="wrapper-section flex justify-between mobile:flex-col mobile:gap-8 mobile:items-center">
            <Dropdown
              label="Province"
              labelStyle="font-bold pb-2"
              width="w-[300px] mobile:w-[350px]"
              options={provinceList}
              value={provinceId}
              provinceChange={provinceChange}
            />
            <Dropdown
              label="City"
              labelStyle="font-bold pb-2"
              width="w-[300px] mobile:w-[350px]"
              options={cityList}
              value={editData.city}
              onChange={(e) => setEditData({ ...editData, city: e })}
            />
            <Dropdown
              label="Zip Code"
              labelStyle="font-bold pb-2"
              width="w-[300px] mobile:w-[350px]"
              options={zipCodeList}
              value={editData.zip}
              onChange={(e) => setEditData({ ...editData, zip: e })}
            />
          </div>
          <div className="submit-btn flex justify-center pt-[100px] gap-8 mobile:flex-col mobile:items-center mobile:gap-0">
            <Button
              text="Back"
              styling="p-4 mb-[50px] bg-amber-400 rounded-[10px] w-[200px] hover:bg-amber-500"
              onClick={props.exitEditFunction}
            />
            <Button
              text="Edit Address"
              styling="p-4 mb-[50px] bg-amber-400 rounded-[10px] w-[200px] hover:bg-amber-500"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditAddress;
