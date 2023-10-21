import React from "react";
import styles from "@/styles/Table.module.css";

function PromoTableHead() {
  return (
    <tr className={`bg-white`}>
      <th
        className={`${styles.thArea} px-[20px] py-[10px] text-left w-[50px] h-[69px]`}
      >
        ID
      </th>
      <th
        className={`${styles.thArea} px-[20px] py-[10px] text-left w-[150px] h-[69px]`}
      >
        Code
      </th>
      <th
        className={`${styles.thArea} px-[20px] py-[10px] text-left w-[150px] h-[69px]`}
      >
        Description
      </th>
      <th
        className={`${styles.thArea} px-[20px] py-[10px] text-left w-[125px] h-[69px]`}
      >
        Expiration Date
      </th>
      {/* <th
        className={`${styles.thArea} px-[20px] py-[10px] text-left w-[125px] h-[69px]`}
      >
        Quantity
      </th> */}
      <th
        className={`${styles.thArea} px-[20px] py-[10px] text-left w-[125px] h-[69px]`}
      >
        Options
      </th>
    </tr>
  );
}

export default PromoTableHead;
