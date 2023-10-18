import React, { useState, useEffect } from "react";
import UserNav from "@/components/UserNav";
import UserHeader from "@/components/HeaderSection";
import WarningModal from "@/components/WarningModal";
import { useStoreLoginPersist } from "@/store/store";
import { useRouter } from "next/router";
import { BASE_URL } from "@/constants/constants";
import PackageDimensions from "./PackageDimensions";
import SelectionModal from "@/components/SelectionModal";
import { DeepPartial, IAddress, IShippingData } from "@/types/types";
import PackageAddress from "./PackageAddress";
import { useMultiStepForm } from "./UseMultiform";
import Button from "@/components/Button";

function CreateShipping() {
  const [showEmptyAddress, setShowEmptyAddress] = useState<boolean>(false);
  const [addressSelection, setAddressSelection] = useState<boolean>(false);
  const [addressList, setAddressList] = useState<IAddress[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<IAddress>({
    id: 0,
    address: "",
    city: "",
    province: "",
    zip: "",
  });
  const [shippingData, setShippingData] = useState<IShippingData>({
    length: 0,
    width: 0,
    height: 0,
    weight: 0,
    start: selectedAddress,
    destAddress: "",
    destCity: "",
    destProvince: "",
    destZip: "",
    category: "",
    insurance: false,
    sameDay: false,
    twoDay: false,
  });

  const selectStartingAddress = (address: IAddress) => {
    setSelectedAddress(address);
    setShippingData({
      ...shippingData,
      start: address,
    });
    setAddressSelection(false);
  };

  const stateLoginPersist = useStoreLoginPersist();
  const router = useRouter();

  const redirectCreateAddress = () => {
    router.push("/user/address/create");
  };

  const checkAddress = async () => {
    try {
      const response = await fetch(`${BASE_URL}/users/${stateLoginPersist.id}`);
      const result = await response.json();

      const addressResponse = await fetch(
        `${BASE_URL}/userAddress/${result.addressId}`
      );
      const addressResult = await addressResponse.json();

      if (addressResult.addressList.length === 0) {
        setShowEmptyAddress(true);
        return;
      }

      setAddressList(addressResult.addressList);
      setAddressSelection(true);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    checkAddress();
  }, []);

  const updateFields = (fields: Partial<IShippingData>) => {
    setShippingData((prevData) => {
      return { ...prevData, ...fields };
    });
  };

  const { step, isFirstStep, back, next, isLastStep } = useMultiStepForm([
    <PackageDimensions key={1} {...shippingData} updateFields={updateFields} />,
    <PackageAddress key={2} {...shippingData} updateFields={updateFields} />,
  ]);

  const submit = async (e: any) => {
    e.preventDefault();
    if (!isLastStep) {
      return next();
    }

    console.log(shippingData);
  };

  return (
    <>
      {showEmptyAddress && (
        <WarningModal
          problem="It seems you don't have any addresses registered!"
          solution="Click the button below to add an address first, then come back here!"
          solutionBtn="Create a new address"
          redirectFunction={redirectCreateAddress}
        />
      )}

      {addressSelection && (
        <SelectionModal
          addressList={addressList}
          selectAddressFunction={selectStartingAddress}
        />
      )}

      <div>
        <UserNav currentPage="shipping" />

        <div className="create-shipping-div">
          <form action="" onSubmit={submit}>
            {step}
            <div className="button-section flex justify-center pt-8 gap-8">
              {!isFirstStep && (
                <Button
                  text="Back"
                  styling="p-3 rounded-[8px] w-[100px] my-6 bg-amber-400  hover:bg-amber-500"
                  onClick={(e) => {
                    e.preventDefault();
                    back();
                  }}
                />
              )}
              <Button
                text={`${!isLastStep ? "Next" : "Submit"}`}
                styling="p-3 rounded-[8px] w-[100px] my-6 bg-amber-400  hover:bg-amber-500"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default CreateShipping;
