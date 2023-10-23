import React, { useState, useEffect } from "react";
import UserNav from "@/components/UserNav";
import WarningModal from "@/components/WarningModal";
import { useStoreLoginPersist } from "@/store/store";
import { useRouter } from "next/router";
import { BASE_URL } from "@/constants/constants";
import PackageDimensions from "./PackageDimensions";
import SelectionModal from "@/components/SelectionModal";
import { IAddress, IAdminShipping, IShippingData } from "@/types/types";
import PackageAddress from "./PackageAddress";
import { useMultiStepForm } from "./UseMultiform";
import Button from "@/components/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

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
    adminId: 0,
  });
  const [shippingData, setShippingData] = useState<IShippingData>({
    id: 0,
    adminId: 0,
    length: 0,
    width: 0,
    height: 0,
    weight: 0,
    start: selectedAddress,
    destAddress: "",
    destCity: "",
    destProvince: "",
    destZip: "",
    category: "Personal Items",
    description: "",
    date: "",
    insurance: false,
    sameDay: false,
    twoDay: false,
    alreadyPaid: false,
    status: "",
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

  const lengthMessage = () => toast("Length must be greater than 0!");
  const widthMessage = () => toast("Width must be greater than 0!");
  const heightMessage = () => toast("Height must be greater than 0!");
  const weightMessage = () => toast("Weight must be greater than 0!");
  const successMessage = () =>
    toast("Shipping created! Redirecting you to your shipping list...");

  const submit = async (e: any) => {
    e.preventDefault();
    if (!isLastStep) {
      if (shippingData.length <= 0) {
        lengthMessage();
        return;
      }
      if (shippingData.width <= 0) {
        widthMessage();
        return;
      }
      if (shippingData.height <= 0) {
        heightMessage();
        return;
      }
      if (shippingData.weight <= 0) {
        weightMessage();
        return;
      }

      return next();
    }

    try {
      const response = await fetch(`${BASE_URL}/users/${stateLoginPersist.id}`);
      const result = await response.json();

      const shippingResponse = await fetch(
        `${BASE_URL}/userShipping/${result.shippingId}`
      );
      const shippingResult = await shippingResponse.json();

      const adminResponse = await fetch(`${BASE_URL}/adminShipping`);
      const adminResult = await adminResponse.json();

      const newId = shippingResult.shippingList.length + 1;
      const newDate = new Date().toString();

      const updatedShippingData = shippingData;
      updatedShippingData.id = newId;
      updatedShippingData.date = newDate;

      const { adminId, ...rest } = updatedShippingData;

      const newAdminShipping = {
        ...rest,
        id: adminResult[adminResult.length - 1].id + 1,
        userId: stateLoginPersist.id,
        status: "",
      };

      updatedShippingData.adminId = adminResult[adminResult.length - 1].id + 1;

      setShippingData(updatedShippingData);

      shippingResult.shippingList.push(shippingData);

      await axios.patch(
        `${BASE_URL}/userShipping/${result.shippingId}`,
        shippingResult
      );
      await axios.post(`${BASE_URL}/adminShipping/`, newAdminShipping);

      setTimeout(() => {
        router.push("/user/shipping/manage");
      }, 3000);

      successMessage();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div>
        <UserNav currentPage="shipping" />
        <ToastContainer />
        <div className="create-shipping-div pb-12">
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
    </>
  );
}

export default CreateShipping;
