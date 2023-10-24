import React, { useState, useEffect } from "react";
import AdminNav from "@/components/AdminNav";
import TableHead from "@/components/TableHead";
import TableData from "@/components/TableData";
import { IAdminAddress, IReviews, IUserAddress } from "@/types/types";
import { BASE_URL } from "@/constants/constants";
import Pagination from "@/components/Pagination";
import Input from "@/components/Input";
import AdminReviewTableHead from "@/components/AdminReviewTableHead";
import AdminReviewTableData from "@/components/AdminReviewTableData";

function AdminViewReviews() {
  const [reviewData, setReviewData] = useState<IReviews[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [count, setCount] = useState<number>(0);
  const [search, setSearch] = useState<string>("");

  const getAddressData = async () => {
    try {
      const response = await fetch(`${BASE_URL}/userReviews`);
      const result = await response.json();

      const filteredArray = result.filter((data: IReviews) => {
        return data.review.toLowerCase().includes(search.toLowerCase());
      });

      setCount(filteredArray.length);
      setReviewData(
        filteredArray.slice((currentPage - 1) * 5, currentPage * 5)
      );
    } catch (e) {
      console.log(e);
    }
  };

  const movePage = (pageNum: number) => {
    setCurrentPage(pageNum);
  };

  useEffect(() => {
    getAddressData();
  }, [currentPage, search]);

  return (
    <div className="view-earnings-div min-h-screen bg-slate-200">
      <AdminNav />
      <div className="flex justify-between items-center view-earnings-header mx-[200px] py-[18px] pt-[50px]">
        <h1 className="text-[30px] font-medium">View Reviews</h1>
        <Input
          label=""
          type="text"
          name="search"
          styling="mr-[115px]"
          width="w-[300px]"
          placeholder="Search by review here"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="view-earnings-content pt-[30px]">
        <div className="table-section ml-[200px] mr-[315px]">
          <table className="table-area w-full">
            <tbody>
              <AdminReviewTableHead />
              {reviewData.map((data, index) => (
                <AdminReviewTableData
                  key={index}
                  index={index}
                  id={data.id}
                  userId={data.userId}
                  shippingNum={data.shippingNum}
                  date={data.date}
                  review={data.review}
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
    </div>
  );
}

export default AdminViewReviews;
