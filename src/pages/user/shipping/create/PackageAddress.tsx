import React, { useState, useEffect } from "react";
import Input from "@/components/Input";
import Dropdown from "@/components/Dropdown/Dropdown";
import provinces from "@/database/provinces.json";
import cities from "@/database/cities.json";
import { useStoreLoginPersist } from "@/store/store";
import { useRouter } from "next/router";
import UserHeader from "@/components/HeaderSection";

interface IProvince {
  province_id: string;
  province: string;
}

function PackageAddress() {
  const [provinceList, setProvinceList] = useState<IProvince[]>([]);
  const [provinceId, setProvinceId] = useState<string>("");
  const [cityList, setCityList] = useState<string[]>([]);
  const [zipCodeList, setZipCodeList] = useState<string[]>([]);
  const [currentAddress, setCurrentAddress] = useState<string>("");
  const [currentProvince, setCurrentProvince] = useState<string>("");
  const [currentCity, setCurrentCity] = useState<string>("");
  const [currentZipCode, setCurrentZipCode] = useState<string>("");
  const [itemDescription, setItemDescription] = useState<string>("");

  const stateLoginPersist = useStoreLoginPersist();
  const router = useRouter();

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
  return (
    <div>
      <div className="header-section pb-8">
        <UserHeader title="Create Shipping - Package Address" />
      </div>
      <div className="package-form-wrapper mx-[350px] flex-col justify-center mobile:mx-auto">
        <div className="address-section pb-8 mobile:flex mobile:justify-center">
          <Input
            label="Address Line"
            type="text"
            name="addressLine"
            width="w-[1150px] mobile:w-[350px]"
            onChange={(e) => setCurrentAddress(e.target.value)}
            required
          />
        </div>
        <div className="wrapper-section flex pb-8 justify-between mr-[70px] mobile:mx-[30px] mobile:flex-col mobile: gap-8">
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
        <div className="category-addon-section mobile:mx-[30px]">
          <div className="category-section pb-8 mobile:flex mobile:justify-center">
            <Input
              label="Brief description of item:"
              type="text"
              name="sendCategory"
              width="w-[1150px] mobile:w-[350px]"
              onChange={(e) => setItemDescription(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="addon  mobile:mx-[30px]">
          <p className="pb-[8px] text-lg font-bold">Add-ons</p>
          <div className="addon-section flex justify-between mr-[70px] mobile:flex-col">
            <div className="insurance-check flex items-center gap-4">
              <p className="mt-1">Insurance (+5000)</p>
              <Input label="" type="checkbox" name="sendCategory" />
            </div>
            <div className="sameday-check flex items-center gap-4">
              <p className="mt-1">Same-day delivery (+50000)</p>
              <Input label="" type="checkbox" name="sendCategory" />
            </div>
            <div className="twoday-check flex items-center gap-4">
              <p className="mt-1">Two-day delivery (+30000)</p>
              <Input label="" type="checkbox" name="sendCategory" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PackageAddress;
