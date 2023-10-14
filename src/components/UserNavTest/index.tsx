import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

function UserNavTest() {
  const [navbar, setNavbar] = useState(false);
  return (
    <div>
      <nav className="w-full fixed top-0 left-0 right-0 z-10 bg-red-300">
        <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
          <div>
            <div className="flex items-center justify-between py-3 md:py-5 md:block">
              {/* LOGO */}
              <Link href="/">
                <h2 className="text-2xl font-bold ">Courier</h2>
              </Link>
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
                <li className="px-6 py-3 text-center bg-amber-300 hover:bg-amber-500   md:hover:text-amber-500 md:hover:bg-transparent">
                  <Link href="#about" onClick={() => setNavbar(!navbar)}>
                    Shipping
                  </Link>
                </li>
                <li className="px-6 py-3 text-center  hover:bg-purple-600    md:hover:text-purple-600 md:hover:bg-transparent">
                  <Link href="#blog" onClick={() => setNavbar(!navbar)}>
                    Address
                  </Link>
                </li>
                <li className="px-6 py-3 text-center  hover:bg-purple-600    md:hover:text-purple-600 md:hover:bg-transparent">
                  <Link href="#contact" onClick={() => setNavbar(!navbar)}>
                    Payment
                  </Link>
                </li>
                <li className="px-6 py-3 text-center hover:bg-purple-600    md:hover:text-purple-600 md:hover:bg-transparent">
                  <Link href="#projects" onClick={() => setNavbar(!navbar)}>
                    Topup
                  </Link>
                </li>
                <li className="px-6 py-3 text-center hover:bg-purple-600    md:hover:text-purple-600 md:hover:bg-transparent">
                  <Link href="#projects" onClick={() => setNavbar(!navbar)}>
                    Games
                  </Link>
                </li>
                <li className="px-6 py-3 text-center hover:bg-purple-600    md:hover:text-purple-600 md:hover:bg-transparent">
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

export default UserNavTest;
