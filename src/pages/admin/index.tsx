import React, { useState, useEffect } from "react";
import { useStoreLoginPersist } from "@/store/store";
import { useRouter } from "next/router";
import AdminNav from "@/components/AdminNav";
import styles from "../../styles/AdminPage.module.css";
import { IAdmin } from "@/types/types";
import { BASE_URL } from "@/constants/constants";

function AdminPage() {
  const stateLoginPersist = useStoreLoginPersist();
  const router = useRouter();

  const [adminData, setAdminData] = useState<IAdmin>();

  const getAdminData = async () => {
    try {
      const response = await fetch(`${BASE_URL}/users/${stateLoginPersist.id}`);
      const result = await response.json();
      setAdminData(result);
    } catch (e) {
      console.log(e);
    }
  };

  const getTimeOfDay = () => {
    let currentHour = new Date().getHours();

    if (currentHour < 12) {
      return "Good morning";
    } else if (currentHour < 18) {
      return "Good afternoon";
    } else {
      return "Good evening";
    }
  };

  useEffect(() => {
    if (stateLoginPersist.id === 0 || !stateLoginPersist.isAdmin) {
      router.push("/error");
    }

    getAdminData();
  }, []);

  const redirectEditProfile = () => {
    router.push("/admin/editProfile");
  };

  const redirectLogout = () => {
    stateLoginPersist.setId(0);
    stateLoginPersist.setIsAdmin(false);
    router.push("/");
  };

  return (
    <div className="admin-main-div min-h-screen bg-slate-200">
      <AdminNav />
      <div
        className={`${styles.adminMainArea} admin-main-content mx-[200px] py-[18px] pt-[50px]`}
      >
        <h1 className="text-[30px] font-medium">
          {getTimeOfDay()}, {adminData?.fullname}.
        </h1>
        <h1>What would you like to do today?</h1>
      </div>

      <div
        className={`${styles.adminMainArea} admin-selection-area mx-[200px] py-[18px]`}
      >
        <div
          className={`${styles.adminSelectionArea} admin-selection w-[150px]`}
        >
          <ul>
            <li
              onClick={redirectEditProfile}
              className="pb-3 hover:cursor-pointer"
            >
              Edit Profile
            </li>
            <li className="pb-3 hover:cursor-pointer">Manage addresses</li>
            <li className="pb-3 hover:cursor-pointer">Manage shippings</li>
            <li className="pb-3 hover:cursor-pointer">View earnings</li>
            <li className="pb-3 hover:cursor-pointer">Manage promos</li>
            <li onClick={redirectLogout} className="pb-3 hover:cursor-pointer">
              Logout
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
