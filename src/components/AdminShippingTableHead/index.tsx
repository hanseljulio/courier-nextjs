import React from "react";
import styles from "@/styles/Table.module.css";

function AdminShippingTableHead() {
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
        className={`${styles.thArea} px-[20px] py-[10px] text-left w-[200px] h-[69px]`}
      >
        Starting Address
      </th>
      <th
        className={`${styles.thArea} px-[20px] py-[10px] text-left w-[200px] h-[69px]`}
      >
        Destination Address
      </th>
      <th
        className={`${styles.thArea} px-[20px] py-[10px] text-left w-[225px] h-[69px]`}
      >
        Description
      </th>
      <th
        className={`${styles.thArea} px-[20px] py-[10px] text-left w-[156px] h-[69px]`}
      >
        Status
      </th>
      <th
        className={`${styles.thArea} px-[20px] py-[10px] text-left w-[156px] h-[69px]`}
      >
        Options
      </th>
    </tr>
  );
}

export default AdminShippingTableHead;
