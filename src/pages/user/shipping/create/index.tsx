import React, { useState, useEffect } from "react";
import UserNav from "@/components/UserNav";
import UserHeader from "@/components/HeaderSection";
import WarningModal from "@/components/WarningModal";
import { useStoreLoginPersist } from "@/store/store";
import { useRouter } from "next/router";
import { BASE_URL } from "@/constants/constants";
import PackageDimensions from "./PackageDimensions";
import SelectionModal from "@/components/SelectionModal";
import { IAddress } from "@/types/types";

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

  console.log(selectedAddress);

  const selectStartingAddress = (address: IAddress) => {
    setSelectedAddress(address);
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
        <div className="header-section pb-8">
          <UserHeader title="Create Shipping" />
        </div>
      </div>
    </>
  );
}

export default CreateShipping;
