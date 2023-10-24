import React from "react";
import styles from "@/styles/Table.module.css";

function AdminReviewTableHead() {
  return (
    <tr className={`${styles.tableHeadArea} bg-white`}>
      <th
        className={`${styles.thArea} px-[20px] py-[10px] text-left w-[58px] h-[69px]`}
      >
        ID
      </th>
      <th
        className={`${styles.thArea} px-[20px] py-[10px] text-left w-[58px] h-[69px]`}
      >
        User ID
      </th>
      <th
        className={`${styles.thArea} px-[20px] py-[10px] text-left w-[100px] h-[69px]`}
      >
        Shipping Num
      </th>
      <th
        className={`${styles.thArea} px-[20px] py-[10px] text-left w-[100px] h-[69px]`}
      >
        Date
      </th>
      <th
        className={`${styles.thArea} px-[20px] py-[10px] text-left w-[325px] h-[69px]`}
      >
        Review
      </th>
    </tr>
  );
}

export default AdminReviewTableHead;
