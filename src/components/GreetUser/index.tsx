import React, { useState, useEffect } from "react";
import { useStoreLoginPersist } from "@/store/store";
import { useRouter } from "next/router";
import styles from "./GreetUserNav.module.css";
import { BASE_URL } from "@/constants/constants";

function GreetUser() {
  const [userName, setUserName] = useState<string>("");
  const router = useRouter();
  const stateLoginPersist = useStoreLoginPersist();

  const getUserName = async () => {
    try {
      const response = await fetch(`${BASE_URL}/users/${stateLoginPersist.id}`);
      const result = await response.json();
      setUserName(result.fullname);
    } catch (e) {
      console.log(e);
    }
  };

  const redirectEditProfile = () => {
    router.push("/user/editProfile");
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
    getUserName();
  }, []);

  return (
    <div
      className={`${styles.greetingArea} flex justify-between greet-user-div mx-[350px] pt-[50px]`}
    >
      <div className="greet-section mx-0.5">
        <h1 className="text-[30px] font-medium pb-2">
          {getTimeOfDay()},{" "}
          <span className="text-amber-600 mobile:whitespace-pre">
            {userName}
          </span>
        </h1>
        <h1>What would you like to do today?</h1>
      </div>
      <div className="edit-profile-div mr-[25px] mobile:mr-0 pt-2">
        <h1
          onClick={redirectEditProfile}
          className="text-[20px] hover:text-amber-600 hover:cursor-pointer"
        >
          Edit profile
        </h1>
      </div>
    </div>
  );
}

export default GreetUser;
