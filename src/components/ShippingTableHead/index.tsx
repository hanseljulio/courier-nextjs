import React from "react";
import styles from "@/styles/Table.module.css";

function ShippingTableHead() {
  return (
    <tr className={`${styles.tableHeadArea}`}>
      <th
        className={`${styles.thArea} px-[20px] py-[10px] text-left w-[58px] h-[69px]`}
      >
        ID
      </th>
      <th
        className={`${styles.thArea} px-[20px] py-[10px] text-left w-[300px] h-[69px]`}
      >
        Starting Address
      </th>
      <th
        className={`${styles.thArea} px-[20px] py-[10px] text-left w-[300px] h-[69px]`}
      >
        Destination Address
      </th>
      <th
        className={`${styles.thArea} px-[20px] py-[10px] text-left w-[225px] h-[69px]`}
      >
        Date
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
    </tr>
  );
}

export default ShippingTableHead;
