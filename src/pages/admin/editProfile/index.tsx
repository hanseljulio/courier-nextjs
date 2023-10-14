import React, { useState, useEffect } from "react";
import { useStoreLoginPersist } from "@/store/store";
import { useRouter } from "next/router";
import AdminNav from "@/components/AdminNav";
import Input from "@/components/Input";
import Image from "next/image";
import Button from "@/components/Button";
import styles from "../../../styles/AdminPage.module.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

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
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [adminData, setAdminData] = useState<IAdmin>({
    id: 0,
    email: "",
    fullname: "",
    password: "",
    phone: "",
    photo: "",
    role: "",
  });

  const [showLoading, setShowLoading] = useState<boolean>(false);

  const successMessage = () => toast("Profile update success!");

  const invalidPhoneMessage = () =>
    toast("Invalid phone format! Start with +62 or 0 for your phone number.");

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

  const stateLoginPersist = useStoreLoginPersist();
  const router = useRouter();

  const getAdminData = async () => {
    try {
      const response = await fetch(
        `http://localhost:2000/users/${stateLoginPersist.id}`
      );
      const result = await response.json();
      setAdminData(result);

      if (result.photo !== "") {
        let profileImageFile = await getFile(result.photo);
        setImageFile(profileImageFile);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const profileUpload = async (file: any, folder: string) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", folder);
    let data = "";

    let response = await axios.post(
      `https://api.cloudinary.com/v1_1/dsngblge5/image/upload`,
      formData
    );

    data = response.data.url;
    return data;
  };

  const validPhoneNumber = (phone: string) => {
    return /^(^\+62|62|^08)(\d{3,4}-?){2}\d{3,4}$/.test(phone);
  };

  const submit = async (e: any) => {
    e.preventDefault();

    if (!validPhoneNumber(adminData.phone)) {
      invalidPhoneMessage();
      return;
    }

    setShowLoading(true);

    if (imageFile) {
      let profilePictureLink = await profileUpload(
        imageFile,
        "adminProfileImage"
      );

      let currentData = adminData;
      currentData.photo = profilePictureLink;
      setAdminData(currentData);
    }

    const submitData = adminData;

    axios
      .patch(`http://localhost:2000/users/${stateLoginPersist.id}`, submitData)
      .then(() => {
        setShowLoading(false);
        successMessage();
      });
  };

  useEffect(() => {
    if (stateLoginPersist.id === 0 || !stateLoginPersist.isAdmin) {
      router.push("/error");
    }

    getAdminData();
  }, []);

  return (
    <div className="admin-profile-div min-h-screen bg-slate-200">
      <AdminNav picture={adminData.photo} />
      <div
        className={`${styles.adminMainArea} admin-profile-content mx-[200px] py-[18px] pt-[100px]`}
      >
        <ToastContainer />
        <div className="titles-section">
          <h1 className="text-[30px] text-center font-medium">Edit profile</h1>
        </div>
      </div>
      <div
        className={`${styles.adminMainArea} form-area mx-[350px] py-[18px] pt-[20px]`}
      >
        <form action="" onSubmit={submit}>
          <div className={`${styles.formArea} flex justify-around`}>
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
            <div
              className={`${styles.formImageArea} flex-col justify-center items-center admin-edit-photo`}
            >
              <Image
                src={`${
                  imageFile === null
                    ? "/images/defaultuser.png"
                    : URL.createObjectURL(imageFile)
                }`}
                alt="Nothing"
                width={200}
                height={200}
                className={`${styles.imgArea} w-[200px] h-[200px]`}
                style={{
                  objectFit: "fill",
                  borderRadius: "100%",
                }}
              />
              <br />
              <label className="custom-file-upload bg-slate-300 hover:cursor-pointer hover:bg-white p-4 rounded-[10px] ml-1.5 text-center">
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files !== null) {
                      setImageFile(e.target.files[0]);
                    }
                  }}
                />
                {!adminData.photo
                  ? "Upload profile photo"
                  : "Replace profile photo"}
              </label>
            </div>
          </div>
          <div className="flex submit-btn justify-center pt-[100px]">
            {showLoading ? (
              <AiOutlineLoading3Quarters className="animate-spin text-3xl" />
            ) : (
              <Button
                text="Save Changes"
                styling="p-4 mb-[50px] bg-slate-300 rounded-[10px] w-[200px] hover:bg-white"
              />
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminEditProfile;
