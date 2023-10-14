import React, { useState, useEffect } from "react";
import { useStoreLoginPersist } from "@/store/store";
import { useRouter } from "next/router";
import Image from "next/image";
import styles from "./UserNav.module.css";

interface HomeNavProps {
  currentPage?: string;
  picture?: string;
}

interface IAdmin {
  id: number;
  email: string;
  fullname: string;
  password: string;
  phone: string;
  photo: string;
  role: string;
}

function UserNav(props: HomeNavProps) {
  const stateLoginPersist = useStoreLoginPersist();
  const router = useRouter();

  const [adminData, setAdminData] = useState<IAdmin>();
  const [imageFile, setImageFile] = useState<string>("");

  const redirectEditProfile = () => {
    router.push("/user/editProfile");
  };

  const redirectTransfer = () => {
    alert();
  };

  const redirectTopup = () => {
    alert();
  };

  const redirectGames = () => {
    alert();
  };

  const redirectLogout = () => {
    stateLoginPersist.setId(0);
    stateLoginPersist.setIsAdmin(false);
    router.push("/");
  };

  const redirectHome = () => {
    alert();
  };

  const urlToLink = async (link: string) => {
    const randomName =
      Math.floor(Math.random() * (999999 - 100000) + 100000).toString() +
      ".jpg";

    let imgFile = fetch(link).then(async (response) => {
      const blob = await response.blob();
      const file = new File([blob], randomName);
      return file;
    });

    return imgFile;
  };

  const getFile = async (link: File | string) => {
    let result = await urlToLink(typeof link === "string" ? link : "");
    return result;
  };

  const getAdminData = async () => {
    if (props.picture) {
      let profileImageFile = await getFile(props.picture);
      setImageFile(URL.createObjectURL(profileImageFile));
    }

    try {
      const response = await fetch(
        `http://localhost:2000/users/${stateLoginPersist.id}`
      );
      const result = await response.json();
      setAdminData(result);

      if (result.photo !== "") {
        let profileImageFile = await getFile(result.photo);
        setImageFile(URL.createObjectURL(profileImageFile));
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getAdminData();
  }, [props.picture]);

  return (
    <div className="user-nav-div ">
      <div
        className={`${styles.navArea} flex user-nav-wrapper mx-[200px] py-[18px] justify-between`}
      >
        <div className="logo-section flex items-center">
          <h1 className="text-[24px] font-bold">Courier</h1>
        </div>
        <div className={`${styles.centerSelectionDisplay}`}>
          <ul className="flex gap-10 items-center pt-[8px] font-semibold text-sm">
            <li
              className={`text-secondarytext ${
                props.currentPage === "home" ? "underline" : ""
              } hover:cursor-pointer`}
              onClick={redirectHome}
            >
              Shipping
            </li>
            <li
              className={`text-secondarytext ${
                props.currentPage === "transfer" ? "underline" : ""
              } hover:cursor-pointer`}
              onClick={redirectTransfer}
            >
              Address
            </li>
            <li
              className={`text-secondarytext ${
                props.currentPage === "transfer" ? "underline" : ""
              } hover:cursor-pointer`}
              onClick={redirectTransfer}
            >
              Payment
            </li>
            <li
              className={`text-secondarytext ${
                props.currentPage === "topup" ? "underline" : ""
              } hover:cursor-pointer`}
              onClick={redirectTopup}
            >
              Topup
            </li>
            <li
              className={`text-secondarytext ${
                props.currentPage === "games" ? "underline" : ""
              } hover:cursor-pointer`}
              onClick={redirectGames}
            >
              Games
            </li>
          </ul>
        </div>
        <div
          className={`user-picture hover:cursor-pointer mr-[110px] ${styles.navRight} `}
          onClick={redirectEditProfile}
        >
          <ul
            className={`flex gap-5 items-center pt-[-1px] font-semibold text-sm`}
          >
            <li
              className={`text-secondarytext ${styles.nameDisplay}`}
            >{`${adminData?.fullname}`}</li>
            <Image
              src={`${!imageFile ? "/images/defaultuser.png" : imageFile}`}
              alt="Nothing"
              width={25}
              height={25}
              className={`w-[45px] h-[45px]`}
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

export default UserNav;
