import React from "react";
import { useStoreLoginPersist } from "@/store/store";
import { useRouter } from "next/router";
import Image from "next/image";
import styles from "./AdminNav.module.css";

interface HomeNavProps {
  userName?: string;
  profilePicture?: string;
}

function AdminNav(props: HomeNavProps) {
  const stateLoginPersist = useStoreLoginPersist();
  const router = useRouter();

  const redirectEditProfile = () => {
    router.push("/admin/editProfile");
  };

  return (
    <div className="user-nav-div bg-slate-300">
      <div
        className={`${styles.navArea} flex user-nav-wrapper mx-[200px] py-[18px] justify-between`}
      >
        <div className="logo-section flex items-center">
          <h1 className="text-[24px] font-bold">Courier</h1>
        </div>
        <div
          className="user-picture hover:cursor-pointer"
          onClick={redirectEditProfile}
        >
          <ul
            className={`${styles.navRight} flex gap-5 items-center pt-[5px] font-semibold text-sm mr-[110px]`}
          >
            <li className="text-secondarytext ">{`${
              !props.userName ? "User" : props.userName
            }`}</li>
            <Image
              src={`${
                !props.profilePicture
                  ? "/images/defaultuser.png"
                  : props.profilePicture
              }`}
              alt="Nothing"
              width={25}
              height={25}
              style={{
                objectFit: "cover",
                borderRadius: "100%",
              }}
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AdminNav;
