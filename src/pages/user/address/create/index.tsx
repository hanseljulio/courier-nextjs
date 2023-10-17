import React, { useState, useEffect } from "react";
import UserNav from "@/components/UserNav";
import UserHeader from "@/components/HeaderSection";
import Input from "@/components/Input";
import provinces from "@/database/provinces.json";
import cities from "@/database/cities.json";
import Dropdown from "@/components/Dropdown/Dropdown";
import Button from "@/components/Button";

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
    if (provinceId === "") {
      provinceChange("1");
    }
    getProvinceData();
  }, [provinceId]);

  const submit = async (e: any) => {
    e.preventDefault();
    console.log("RESULTS");
    console.log("Address: " + currentAddress);
    console.log("Province: " + currentProvince);
    console.log("City: " + currentCity);
    console.log("Zip Code: " + currentZipCode);
  };

  return (
    <div>
      <UserNav currentPage="address" />
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
