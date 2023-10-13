import React, { useState, useEffect } from "react";
import { useStoreLoginPersist } from "@/store/store";
import { useRouter } from "next/router";
import AdminNav from "@/components/AdminNav";
import Input from "@/components/Input";
import Image from "next/image";
import Button from "@/components/Button";

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

  const [adminData, setAdminData] = useState<IAdmin>({
    id: 0,
    email: "",
    fullname: "",
    password: "",
    phone: "",
    photo: "",
    role: "",
  });

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
      <div className="admin-profile-content mx-[200px] py-[18px] pt-[50px]">
        <div className="titles-section">
          <h1 className="text-[30px] font-medium">Edit profile</h1>
        </div>
      </div>
      <div className="form-area mx-[200px] py-[18px] pt-[20px]">
        <form action="">
          <div className="flex">
            <div className="input-form-area">
              <Input
                label="Email"
                type="email"
                name="adminEditEmail"
                styling="pb-5"
                width="w-[300px]"
                required={true}
                value={adminData?.email}
                onChange={(e) => {
                  setAdminData({
                    ...adminData,
                    email: e.target.value,
                  });
                }}
              />
              <Input
                label="Full Name"
                type="text"
                name="adminEditFullName"
                styling="pb-5"
                width="w-[300px]"
                required={true}
                value={adminData?.fullname}
                onChange={(e) => {
                  setAdminData({
                    ...adminData,
                    fullname: e.target.value,
                  });
                }}
              />
              <Input
                label="Phone Number"
                type="string"
                name="adminEditPhoneNumber"
                styling="pb-5"
                width="w-[300px]"
                required={true}
                value={adminData?.phone}
                onChange={(e) => {
                  setAdminData({
                    ...adminData,
                    phone: e.target.value,
                  });
                }}
              />
            </div>
            <div className="admin-edit-photo">
              <Image
                src={`${
                  adminData.photo === ""
                    ? "/images/defaultuser.png"
                    : adminData.photo
                }`}
                alt="Nothing"
                width={200}
                height={200}
                style={{
                  objectFit: "cover",
                  borderRadius: "100%",
                }}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminEditProfile;
