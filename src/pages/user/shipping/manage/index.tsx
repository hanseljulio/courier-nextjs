import React, { useState, useEffect } from "react";
import UserNav from "@/components/UserNav";
import Input from "@/components/Input";
import ShippingTableHead from "@/components/ShippingTableHead";
import { IShippingData } from "@/types/types";
import ShippingTableData from "@/components/ShippingTableData";
import Pagination from "@/components/Pagination";
import { useStoreLoginPersist } from "@/store/store";
import { BASE_URL } from "@/constants/constants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Payment from "@/components/Payment";
import ReviewModal from "@/components/ReviewModal";
import Dropdown from "@/components/Dropdown/Dropdown";
import Head from "next/head";

function ManageShipping() {
  const stateLoginPersist = useStoreLoginPersist();
  const [shippingData, setShippingData] = useState<IShippingData[]>([]);
  const [search, setSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [count, setCount] = useState<number>(0);
  const [currentShippingId, setCurrentShippingId] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("");

  const movePage = (pageNum: number) => {
    setCurrentPage(pageNum);
  };

  const dateConverter = (date: Date) => {
    const time = date.toTimeString().substring(0, 5);

    const modifiedDate = date.toUTCString().substring(4, 16);

    return `${time} - ${modifiedDate}`;
  };

  const getShippingData = async () => {
    try {
      const response = await fetch(`${BASE_URL}/users/${stateLoginPersist.id}`);
      const result = await response.json();

      setCurrentShippingId(result.shippingId);

      const shippingResponse = await fetch(
        `${BASE_URL}/userShipping/${result.shippingId}`
      );
      const shippingResult = await shippingResponse.json();

      const filteredArray = shippingResult.shippingList.filter(
        (data: IShippingData) => {
          const mergedDescription = `${data.category} - ${data.description}`;
          return mergedDescription.toLowerCase().includes(search);
        }
      );

      shippingResult.shippingList = filteredArray;
      setCount(shippingResult.shippingList.length);

      if (sortBy === "Size - ASC") {
        const sortedArray = shippingResult.shippingList.sort(function (
          a: IShippingData,
          b: IShippingData
        ) {
          return a.length * a.width * a.height - b.length * b.width * b.height;
        });

        setShippingData(
          sortedArray.slice((currentPage - 1) * 5, currentPage * 5)
        );
      } else if (sortBy === "Size - DESC") {
        const sortedArray = shippingResult.shippingList.sort(function (
          a: IShippingData,
          b: IShippingData
        ) {
          return b.length * b.width * b.height - a.length * a.width * a.height;
        });

        setShippingData(
          sortedArray.slice((currentPage - 1) * 5, currentPage * 5)
        );
      } else if (sortBy === "Weight - ASC") {
        const sortedArray = shippingResult.shippingList.sort(function (
          a: IShippingData,
          b: IShippingData
        ) {
          return a.weight - b.weight;
        });

        setShippingData(
          sortedArray.slice((currentPage - 1) * 5, currentPage * 5)
        );
      } else if (sortBy === "Weight - DESC") {
        const sortedArray = shippingResult.shippingList.sort(function (
          a: IShippingData,
          b: IShippingData
        ) {
          return b.weight - a.weight;
        });

        setShippingData(
          sortedArray.slice((currentPage - 1) * 5, currentPage * 5)
        );
      } else if (sortBy === "Category - ASC") {
        const priority = [
          "Food",
          "Medical Supplies",
          "Others",
          "Personal Items",
        ];
        const sortedArray = shippingResult.shippingList.sort(function (
          a: IShippingData,
          b: IShippingData
        ) {
          return priority.indexOf(a.category) - priority.indexOf(b.category);
        });

        setShippingData(
          sortedArray.slice((currentPage - 1) * 5, currentPage * 5)
        );
      } else if (sortBy === "Category - DESC") {
        const priority = [
          "Food",
          "Medical Supplies",
          "Others",
          "Personal Items",
        ];
        const sortedArray = shippingResult.shippingList.sort(function (
          a: IShippingData,
          b: IShippingData
        ) {
          return priority.indexOf(b.category) - priority.indexOf(a.category);
        });

        setShippingData(
          sortedArray.slice((currentPage - 1) * 5, currentPage * 5)
        );
      } else if (sortBy === "Payment - Sort by paid") {
        const priority = [true, false];
        const sortedArray = shippingResult.shippingList.sort(function (
          a: IShippingData,
          b: IShippingData
        ) {
          return (
            priority.indexOf(a.alreadyPaid) - priority.indexOf(b.alreadyPaid)
          );
        });

        setShippingData(
          sortedArray.slice((currentPage - 1) * 5, currentPage * 5)
        );
      } else if (sortBy === "Payment - Sort by unpaid") {
        const priority = [false, true];
        const sortedArray = shippingResult.shippingList.sort(function (
          a: IShippingData,
          b: IShippingData
        ) {
          return (
            priority.indexOf(a.alreadyPaid) - priority.indexOf(b.alreadyPaid)
          );
        });

        setShippingData(
          sortedArray.slice((currentPage - 1) * 5, currentPage * 5)
        );
      } else {
        setShippingData(
          filteredArray.slice((currentPage - 1) * 5, currentPage * 5)
        );
      }

      setShippingData(
        shippingResult.shippingList.slice(
          (currentPage - 1) * 5,
          currentPage * 5
        )
      );
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getShippingData();
  }, [currentPage, search, sortBy]);

  const [showPayment, setShowPayment] = useState<boolean>(false);
  const paidMessage = () =>
    toast(
      "Payment sucessful! Go to the games section for a chance to win prizes!"
    );
  const reviewMessage = () =>
    toast("Review posted - thank you for your feedback!");

  const [selectedId, setSelectedId] = useState<number>(1);
  const [showReview, setShowReview] = useState<boolean>(false);

  const reviewOn = (selectedId: number) => {
    setSelectedId(selectedId);
    setShowReview(true);
  };

  const reviewOff = () => {
    setShowReview(false);
  };

  const reviewSubmit = () => {
    setShowReview(false);
    getShippingData();
    reviewMessage();
  };

  const paymentOn = (selectedId: number) => {
    setSelectedId(selectedId);
    setShowPayment(true);
  };

  const paymentOff = () => {
    setShowPayment(false);
  };

  const paymentSubmit = () => {
    setShowPayment(false);
    getShippingData();
    paidMessage();
  };

  return (
    <>
      <div>
        <Head>
          <title>Manage Shipping</title>
        </Head>
        <UserNav currentPage="shipping" />
        <ToastContainer />
        <div className="flex justify-between items-center view-earnings-header mx-[350px] pt-[50px] pb-[30px] mobile:flex-col mobile:mx-auto mobile: gap-6">
          <h1 className="text-[30px] font-medium mt-2 text-amber-600">
            Manage Shipping
          </h1>
          <Dropdown
            label="Sort by"
            flexLabel="flex items-center gap-6 mt-3"
            labelStyle="font-bold pb-2 pt-2"
            width="w-[300px] mobile:w-[200px]"
            onChange={(e) => setSortBy(e)}
            options={[
              "None",
              "Size - ASC",
              "Size - DESC",
              "Weight - ASC",
              "Weight - DESC",
              "Category - ASC",
              "Category - DESC",
              "Payment - Sort by paid",
              "Payment - Sort by unpaid",
            ]}
          />
          <Input
            label=""
            type="text"
            name="search"
            styling=""
            width="w-[300px]"
            placeholder="Search shipping description here"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <h1 className="text-center pb-8">
          To pay for a shipping, click on the word &apos;UNPAID&apos;. Otherwise
          you&apos;re good!
        </h1>
        <div className="content-wrapper">
          {shippingData.length === 0 ? (
            <h1 className="text-center font-medium text-[25px]">
              Nothing to see here!
            </h1>
          ) : (
            <div className="content">
              <div className="table-section mx-[350px] mobile:scale-[0.95] mobile:mx-auto mobile:overflow-scroll">
                <table className="table-area w-full">
                  <tbody>
                    <ShippingTableHead />
                    {shippingData.map((data, index) => (
                      <ShippingTableData
                        key={index}
                        id={data.id}
                        index={data.id}
                        startAddress={`${data.start.address}, ${data.start.city}, ${data.start.province} ${data.start.zip}`}
                        destAddress={`${data.destAddress}, ${data.destCity}, ${data.destProvince} ${data.destZip}`}
                        date={dateConverter(new Date(data.date))}
                        description={`${data.category} - ${
                          data.description ? data.description : "No description"
                        }`}
                        status={data.alreadyPaid}
                        currentStatus={data.status}
                        shippingId={currentShippingId}
                        refresh={getShippingData}
                        paymentOn={paymentOn}
                        alreadyReviewed={data.alreadyReviewed}
                        reviewOn={reviewOn}
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

      {showPayment && (
        <Payment
          shippingId={currentShippingId}
          selectedId={selectedId}
          exitPayment={paymentOff}
          paymentSubmit={paymentSubmit}
        />
      )}

      {showReview && (
        <ReviewModal
          userId={stateLoginPersist.id}
          shippingNum={selectedId}
          shippingId={currentShippingId}
          exitFunction={reviewOff}
          submitFunction={reviewSubmit}
        />
      )}
    </>
  );
}

export default ManageShipping;
