import React from "react";
import { useStoreLoginPersist } from "@/store/store";
import { useRouter } from "next/router";

interface HomeNavProps {
  currentPage?: string;
}

function AdminNav(props: HomeNavProps) {
  const stateLoginPersist = useStoreLoginPersist();
  const router = useRouter();

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

  return (
    <div className="user-nav-div ">
      <div className="flex user-nav-wrapper mx-[200px] py-[18px] justify-between">
        <div className="logo-section flex items-center">
          <h1 className="text-[24px] font-bold">Courier</h1>
        </div>
        <div className="nav-selection">
          <ul className="flex gap-10 items-center pt-[8px] font-semibold text-sm mr-[110px]">
            <li
              className={`text-secondarytext ${
                props.currentPage === "profile" ? "underline" : ""
              } hover:cursor-pointer`}
              onClick={redirectGames}
            >
              Profile
            </li>
            <li
              className="text-secondarytext hover:cursor-pointer"
              onClick={redirectLogout}
            >
              Logout
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AdminNav;
