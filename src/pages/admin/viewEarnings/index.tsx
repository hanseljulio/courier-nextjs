import React, { useState, useEffect } from "react";
import AdminNav from "@/components/AdminNav";
import { IEarnings } from "@/types/types";
import Dropdown from "@/components/Dropdown/Dropdown";
import EarningsTableHead from "@/components/EarningsTableHead";
import EarningsTableData from "@/components/EarningsTableData";
import Pagination from "@/components/Pagination";
import { BASE_URL } from "@/constants/constants";

function ViewEarnings() {
  const [earningsData, setEarningsData] = useState<IEarnings[]>([]);
  const [currentMonth, setCurrentMonth] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [count, setCount] = useState<number>(0);

  const movePage = (pageNum: number) => {
    setCurrentPage(pageNum);
  };

  const getEarningsData = async () => {
    const response = await fetch(`${BASE_URL}/adminEarnings`);
    const result = await response.json();

    setCount(result.length);

    if (currentMonth !== "All of them") {
      const filteredArray = result.filter((data: IEarnings) => {
        return data.date
          .toLowerCase()
          .substring(4, 7)
          .includes(currentMonth.toLowerCase().substring(0, 3));
      });
      setEarningsData(
        filteredArray.slice((currentPage - 1) * 5, currentPage * 5)
      );
    } else {
      setEarningsData(result.slice((currentPage - 1) * 5, currentPage * 5));
    }
  };

  useEffect(() => {
    getEarningsData();
  }, [currentPage, currentMonth]);

  return (
    <div className="view-earnings-div min-h-screen bg-slate-200">
      <AdminNav />
      <div className="flex justify-between view-earnings-header mx-[200px] py-[18px] pt-[50px]">
        <h1 className="text-[30px] font-medium">View Earnings</h1>
        <Dropdown
          label="Month of"
          flexLabel="flex items-center gap-8 mr-[115px]"
          labelStyle="font-bold pb-2 pt-2"
          width="w-[300px] mobile:w-full"
          onChange={(e) => setCurrentMonth(e)}
          options={[
            "All of them",
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ]}
        />
      </div>
      {earningsData.length === 0 && (
        <h1 className="text-center font-bold pt-10 text-[30px]">
          Nothing to see here!
        </h1>
      )}
      {earningsData.length > 0 && (
        <div className="view-earnings-content pt-[30px]">
          <div className="table-section ml-[200px] mr-[315px]">
            <table className="table-area w-full">
              <tbody>
                <EarningsTableHead />
                {earningsData.map((data, index) => (
                  <EarningsTableData
                    key={index}
                    index={index}
                    id={data.id}
                    date={data.date}
                    amount={data.amount}
                    fromUserId={data.fromUserId}
                    fromShippingId={data.fromShippingId}
                    shippingNum={data.shippingNum}
                  />
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-center pagination-section mx-[350px] pt-[100px] pb-[50px] mobile:mx-auto">
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
  );
}

export default ViewEarnings;
