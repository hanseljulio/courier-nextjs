import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";
import { useStoreLoginPersist } from "@/store/store";

interface UserNavProps {
  currentPage?: string;
}

function UserNav(props: UserNavProps) {
  const [navbar, setNavbar] = useState(false);
  const stateLoginPersist = useStoreLoginPersist();
  const router = useRouter();

  const redirectHome = () => {
    router.push("/user");
  };

  const redirectUserHomeShipping = () => {
    if (props.currentPage !== "shipping") {
      router.push("/user");
    }
  };

  const redirectUserAddress = () => {
    if (props.currentPage !== "address") {
      router.push("/user/address");
    }
  };

  const redirectUserPayment = () => {
    if (props.currentPage !== "payment") {
      router.push("/user/payment");
    }
  };

  const redirectUserTopup = () => {
    if (props.currentPage !== "topup") {
      router.push("/user/topup");
    }
  };

  const redirectLogout = () => {
    stateLoginPersist.setId(0);
    stateLoginPersist.setIsAdmin(false);
    router.push("/");
  };

  return (
    <div>
      <nav className="w-full bg-amber-300">
        <div className="bg-amber-300 justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
          <div>
            <div className="flex items-center justify-between py-3 md:py-5 md:block">
              {/* LOGO */}
              <h2
                onClick={redirectHome}
                className="text-[24px] font-bold hover:cursor-pointer hover:text-orange-600"
              >
                Courier
              </h2>

              {/* HAMBURGER BUTTON FOR MOBILE */}
              <div className="md:hidden">
                <button
                  className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                  onClick={() => setNavbar(!navbar)}
                >
                  {navbar ? (
                    <Image
                      src="/images/cross.svg"
                      width={30}
                      height={30}
                      alt="logo"
                    />
                  ) : (
                    <Image
                      src="/images/hamburger.svg"
                      width={30}
                      height={30}
                      alt="logo"
                      className="focus:border-none active:border-none"
                    />
                  )}
                </button>
              </div>
            </div>
          </div>
          <div>
            <div
              className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
                navbar ? "p-12 md:p-0 block" : "hidden"
              }`}
            >
              <ul className="h-screen font-semibold text-sm md:h-auto items-center justify-center md:flex ">
                <li
                  onClick={redirectUserHomeShipping}
                  className={`${
                    props.currentPage === "shipping"
                      ? "bg-orange-400 rounded-full hover:cursor-default"
                      : "hover:cursor-pointer hover:bg-amber-500 md:hover:text-amber-500 rounded-full md:hover:bg-transparent"
                  } px-6 py-3 text-center`}
                >
                  Shipping
                </li>
                <li
                  onClick={redirectUserAddress}
                  className={`${
                    props.currentPage === "address"
                      ? "bg-orange-400 rounded-full hover:cursor-default"
                      : "hover:cursor-pointer hover:bg-amber-500 md:hover:text-amber-500 rounded-full md:hover:bg-transparent"
                  } px-6 py-3 text-center`}
                >
                  Address
                </li>
                <li
                  onClick={redirectUserPayment}
                  className={`${
                    props.currentPage === "payment"
                      ? "bg-orange-400 rounded-full hover:cursor-default"
                      : "hover:cursor-pointer hover:bg-amber-500 md:hover:text-amber-500 rounded-full md:hover:bg-transparent"
                  } px-6 py-3 text-center`}
                >
                  Payment
                </li>
                <li
                  onClick={redirectUserTopup}
                  className={`${
                    props.currentPage === "topup"
                      ? "bg-orange-400 rounded-full hover:cursor-default"
                      : "hover:cursor-pointer hover:bg-amber-500 md:hover:text-amber-500 rounded-full md:hover:bg-transparent"
                  } px-6 py-3 text-center`}
                >
                  Topup
                </li>
                <li
                  onClick={redirectLogout}
                  className="px-6 py-3 text-center hover:cursor-pointer hover:bg-amber-500 rounded-full md:hover:text-amber-500 md:hover:bg-transparent"
                >
                  Logout
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default UserNav;
