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

  const randomId = Math.floor(
    Math.random() * (999999 - 100000) + 100000
  ).toString();

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
          <h1 className="text-[30px] text-center font-medium">Edit profile</h1>
        </div>
      </div>
      <div className="form-area mx-[350px] py-[18px] pt-[20px]">
        <form action="">
          <div className="flex justify-around">
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
            <div className="flex-col admin-edit-photo">
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
                  marginLeft: 10,
                }}
              />
              <br />
              <label className="custom-file-upload bg-slate-300 hover:cursor-pointer hover:bg-white p-4 rounded-[10px]">
                <input type="file" className="hidden" />
                {!adminData.photo
                  ? "Upload new profile photo"
                  : "Replace profile photo"}
              </label>
            </div>
          </div>
          <div className="flex submit-btn justify-center pt-[120px]">
            <Button
              text="Save Changes"
              styling="p-4 bg-slate-300 rounded-[10px] w-[200px] hover:bg-white"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminEditProfile;
