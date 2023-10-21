import React from "react";
import styles from "@/styles/Table.module.css";

function EarningsTableHead() {
  return (
    <tr className={`bg-white`}>
      <th
        className={`${styles.thArea} px-[20px] py-[10px] text-left w-[58px] h-[69px]`}
      >
        ID
      </th>
      <th
        className={`${styles.thArea} px-[20px] py-[10px] text-left w-[150px] h-[69px]`}
      >
        Date
      </th>
      <th
        className={`${styles.thArea} px-[20px] py-[10px] text-left w-[150px] h-[69px]`}
      >
        Amount
      </th>
      <th
        className={`${styles.thArea} px-[20px] py-[10px] text-left w-[125px] h-[69px]`}
      >
        From User ID
      </th>
      <th
        className={`${styles.thArea} px-[20px] py-[10px] text-left w-[125px] h-[69px]`}
      >
        From Shipping ID
      </th>
      <th
        className={`${styles.thArea} px-[20px] py-[10px] text-left w-[125px] h-[69px]`}
      >
        Shipping num
      </th>
    </tr>
  );
}

export default EarningsTableHead;
