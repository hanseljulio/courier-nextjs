import React from "react";
import styles from "@/styles/Table.module.css";

interface TableHeadProps {
  adminMode?: boolean;
}

function TableHead(props: TableHeadProps) {
  return (
    <tr
      className={`${styles.tableHeadArea} ${props.adminMode ? "bg-white" : ""}`}
    >
      <th
        className={`${styles.thArea} px-[20px] py-[10px] text-left w-[58px] h-[69px]`}
      >
        ID
      </th>
      <th
        className={`${styles.thArea} ${
          !props.adminMode ? "hidden" : ""
        } px-[20px] py-[10px] text-left w-[58px] h-[69px]`}
      >
        User ID
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
        className={`${styles.thArea} ${
          props.adminMode ? "hidden" : ""
        } px-[20px] py-[10px] text-left w-[156px] h-[69px]`}
      >
        Options
      </th>
    </tr>
  );
}

export default TableHead;
