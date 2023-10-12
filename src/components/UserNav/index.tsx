import React from "react";

interface HomeNavProps {
  currentPage?: string;
}

function UserNav(props: HomeNavProps) {
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
    alert();
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
                props.currentPage === "home" ? "underline" : ""
              } hover:cursor-pointer`}
              onClick={redirectHome}
            >
              Home
            </li>
            <li
              className={`text-secondarytext ${
                props.currentPage === "transfer" ? "underline" : ""
              } hover:cursor-pointer`}
              onClick={redirectTransfer}
            >
              Transfer
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

export default UserNav;
