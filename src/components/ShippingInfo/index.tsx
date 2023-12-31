import React, { useState, useEffect } from "react";
import styles from "./ShippingInfo.module.css";
import { IAdminShipping } from "@/types/types";
import { BASE_URL } from "@/constants/constants";
import Button from "@/components/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import provinces from "@/database/provinces.json";
import Dropdown from "../Dropdown/Dropdown";

interface ShippingInfoProps {
  adminShippingId: number;
  exitFunction: () => void;
}

function ShippingInfo(props: ShippingInfoProps) {
  const [shippingData, setShippingData] = useState<IAdminShipping>({
    id: 0,
    userId: 0,
    length: 0,
    width: 0,
    height: 0,
    weight: 0,
    start: {
      id: 0,
      address: "",
      province: "",
      city: "",
      zip: "",
      adminId: 0,
    },
    destAddress: "",
    destCity: "",
    destProvince: "1",
    destZip: "",
    category: "",
    description: "",
    date: "",
    insurance: false,
    sameDay: false,
    twoDay: false,
    alreadyPaid: false,
    status: "",
  });

  const shippingStatusMessage = () => toast("Shipping status changed!");

  const getShippingData = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/adminShipping/${props.adminShippingId}`
      );
      const result = await response.json();

      setShippingData(result);
    } catch (e) {
      console.log(e);
    }
  };

  const modifyShippingStatus = async () => {
    try {
      await axios.patch(
        `${BASE_URL}/adminShipping/${props.adminShippingId}`,
        shippingData
      );

      const response = await fetch(`${BASE_URL}/users/${shippingData.userId}`);
      const result = await response.json();

      const shippingResponse = await fetch(
        `${BASE_URL}/userShipping/${result.shippingId}`
      );
      const shippingResult = await shippingResponse.json();

      for (let i = 0; i < shippingResult.shippingList.length; i++) {
        if (shippingResult.shippingList[i].adminId === props.adminShippingId) {
          shippingResult.shippingList[i].status = shippingData.status;
          break;
        }
      }

      await axios.patch(
        `${BASE_URL}/userShipping/${result.shippingId}`,
        shippingResult
      );
      shippingStatusMessage();
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getShippingData();
  }, []);

  const getProvince = (id: string) => {
    return provinces.provinces[parseInt(id) - 1].province;
  };

  return (
    <div className={`${styles.modal}`}>
      <ToastContainer />
      <div className={`${styles.overlay}`}></div>
      <div className={`${styles.modalContent} ${styles.popout}`}>
        <div className="header-confirm pt-[10px] pl-[23px] pb-[8px]">
          <div className="title-area flex justify-between items-center py-1">
            <h2 className="text-2xl">Shipping Information</h2>
            <button
              onClick={props.exitFunction}
              className="pr-[43px] mobile:pr-[23px]"
            >
              X
            </button>
          </div>
        </div>
        <hr />
        <div className="edit-promo-content flex-col pt-[10px] pl-[23px] pb-[8px] font-medium mr-[20px] h-[90%]">
          <div className="size-content pb-6">
            <h1>
              Dimensions: {shippingData.length}cm x {shippingData.width}cm x{" "}
              {shippingData.height}cm
            </h1>
            <h1>
              Shipping volume:{" "}
              {shippingData.length * shippingData.width * shippingData.height}{" "}
              cm<sup>3</sup>
            </h1>
            <h1>Weight: {shippingData.weight}kg</h1>
          </div>
          <div className="address-content pb-6">
            <h1>
              Starting address:{" "}
              {`${shippingData.start.address}, ${shippingData.start.city}, ${shippingData.start.province} ${shippingData.start.zip}`}
            </h1>
            <h1>
              Destination address:{" "}
              {`${shippingData.destAddress}, ${shippingData.destCity}, ${shippingData.destProvince} ${shippingData.destZip}`}
              <h1>Date: {shippingData.date}</h1>
            </h1>
          </div>
          <div className="category-desc-content pb-6">
            <h1>Category: {shippingData.category}</h1>
            <h1>
              Description:{" "}
              {shippingData.description ? shippingData.description : "None"}
            </h1>
          </div>
          <div className="addons-content pb-6">
            <h1>
              Addons:{" "}
              {!shippingData.insurance &&
              !shippingData.sameDay &&
              !shippingData.twoDay
                ? "None"
                : ""}
            </h1>
            <h1>{shippingData.insurance ? "- Insurance" : ""}</h1>
            <h1>{shippingData.sameDay ? "- Same Day Delivery" : ""}</h1>
            <h1>{shippingData.twoDay ? "- Two Day Delivery" : ""}</h1>
          </div>
          <div className="status-content">
            <h1>
              {shippingData.alreadyPaid
                ? "User has paid for this shipment"
                : "User has not paid for this shipment"}
            </h1>
            {shippingData.alreadyPaid ? (
              <Dropdown
                label="Shipment status"
                flexLabel="flex items-center gap-8 mt-3"
                labelStyle="pb-2 pt-2"
                width="w-[300px] mobile:w-full"
                value={shippingData.status}
                onChange={(e) =>
                  setShippingData({ ...shippingData, status: e })
                }
                options={["Processing", "Shipped", "Delivered"]}
              />
            ) : null}
          </div>

          {shippingData.alreadyPaid && (
            <div className="buttons-section flex justify-center gap-6 pt-[100px]">
              <Button
                onClick={modifyShippingStatus}
                text="Edit"
                styling="p-4 mb-[50px] bg-amber-400 rounded-[10px] w-[200px] hover:bg-amber-500"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ShippingInfo;
