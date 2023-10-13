import React, { useState, useEffect } from "react";
import { useStoreLoginPersist } from "@/store/store";
import { useRouter } from "next/router";
import AdminNav from "@/components/AdminNav";

interface IAdmin {
  id: number;
  email: string;
  fullname: string;
  password: string;
  phone: string;
  photo: string;
  role: string;
}

function AdminEditProfile() {
  const stateLoginPersist = useStoreLoginPersist();
  const router = useRouter();

  const [adminData, setAdminData] = useState<IAdmin>();

  const getAdminData = async () => {
    try {
      const response = await fetch(
        `http://localhost:2000/users/${stateLoginPersist.id}`
      );
      const result = await response.json();
      setAdminData(result);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (stateLoginPersist.id === 0 || !stateLoginPersist.isAdmin) {
      router.push("/error");
    }

    getAdminData();
  }, []);

  return (
    <div className="admin-profile-div min-h-screen bg-slate-200">
      <AdminNav
        userName={adminData?.fullname}
        profilePicture={adminData?.photo}
      />
      <div className="admin-profile-content">
        <div className="titles-section">
          <h1>Edit profile</h1>
        </div>
      </div>
    </div>
  );
}

export default AdminEditProfile;
