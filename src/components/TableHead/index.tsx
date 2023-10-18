import React from "react";
import styles from "@/styles/Table.module.css";

function TableHead() {
  return (
    <tr className={`${styles.tableHeadArea}`}>
      <th
        className={`${styles.thArea} px-[20px] py-[10px] text-left w-[58px] h-[69px]`}
      >
        ID
      </th>
      <th
        className={`${styles.thArea} px-[20px] py-[10px] text-left w-[380px] h-[69px]`}
      >
        Address
      </th>
      <th
        className={`${styles.thArea} px-[20px] py-[10px] text-left w-[225px] h-[69px]`}
      >
        City
      </th>
      <th
        className={`${styles.thArea} px-[20px] py-[10px] text-left w-[225px] h-[69px]`}
      >
        Province
      </th>
      <th
        className={`${styles.thArea} px-[20px] py-[10px] text-left w-[125px] h-[69px]`}
      >
        Zip
      </th>
      <th
        className={`${styles.thArea} px-[20px] py-[10px] text-left w-[156px] h-[69px]`}
      >
        Options
      </th>
    </tr>
  );
}

export default TableHead;
