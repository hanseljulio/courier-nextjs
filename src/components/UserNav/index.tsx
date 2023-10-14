import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { useStoreLoginPersist } from "@/store/store";

function UserNav() {
  const [navbar, setNavbar] = useState(false);
  const stateLoginPersist = useStoreLoginPersist();
  const router = useRouter();

  const redirectUserHomeShipping = () => {
    router.push("/user");
  };

  const redirectUserAddress = () => {
    router.push("/user/address");
  };

  const redirectUserPayment = () => {
    router.push("/user/payment");
  };

  const redirectUserTopup = () => {
    router.push("/user/topup");
  };

  const redirectUserGames = () => {
    router.push("/user/games");
  };

  const redirectLogout = () => {
    stateLoginPersist.setId(0);
    stateLoginPersist.setIsAdmin(false);
    router.push("/");
  };

  return (
    <div>
      <nav className="w-full fixed top-0 left-0 right-0 z-10">
        <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
          <div>
            <div className="flex items-center justify-between py-3 md:py-5 md:block">
              {/* LOGO */}
              <h2 className="text-[24px] font-bold ">Courier</h2>

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
                  className="px-6 py-3 text-center hover:cursor-pointer  hover:bg-amber-500   md:hover:text-amber-500 md:hover:bg-transparent"
                >
                  Shipping
                </li>
                <li
                  onClick={redirectUserAddress}
                  className="px-6 py-3 text-center hover:cursor-pointer hover:bg-amber-500   md:hover:text-amber-500 md:hover:bg-transparent"
                >
                  Address
                </li>
                <li
                  onClick={redirectUserPayment}
                  className="px-6 py-3 text-center hover:cursor-pointer hover:bg-amber-500   md:hover:text-amber-500 md:hover:bg-transparent"
                >
                  Payment
                </li>
                <li
                  onClick={redirectUserTopup}
                  className="px-6 py-3 text-center hover:cursor-pointer hover:bg-amber-500   md:hover:text-amber-500 md:hover:bg-transparent"
                >
                  Topup
                </li>
                <li
                  onClick={redirectUserGames}
                  className="px-6 py-3 text-center hover:cursor-pointer hover:bg-amber-500   md:hover:text-amber-500 md:hover:bg-transparent"
                >
                  Games
                </li>
                <li
                  onClick={redirectLogout}
                  className="px-6 py-3 text-center hover:cursor-pointer hover:bg-amber-500 md:hover:text-amber-500 md:hover:bg-transparent"
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
