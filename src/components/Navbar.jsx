import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoIosMenu } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { useStoreContext } from "../contextApi/ContextApi";

const Navbar = () => {
  const navigate = useNavigate();
  const { token, setToken } = useStoreContext();
  const path = useLocation().pathname;
  const [navbarOpen, setNavbarOpen] = useState(false);

  const onLogOutHandler = () => {
    setToken(null);
    localStorage.removeItem("JWT_TOKEN");
    navigate("/login");
  };

  return (
    <div className="h-16 bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 z-50 flex items-center justify-center sticky top-0 shadow-sm">
      <div className="lg:px-14 sm:px-8 px-4 w-full flex justify-between items-center max-w-[1920px]">
        {/* LOGO */}
        <Link to="/">
          <img
            src="/images/image1.png"
            alt="BitLeap Logo"
            className="mx-auto lg:mx-0 w-28 md:w-32"
          />
        </Link>

        {/* MENU */}
        <ul
          className={`
            flex sm:gap-10 gap-4 sm:items-center 
            text-gray-700 sm:static absolute left-0 top-[64px]
            sm:shadow-none shadow-lg
            sm:h-fit ${navbarOpen ? "h-fit pb-5" : "h-0 overflow-hidden"}
            transition-all duration-200
            sm:bg-transparent bg-white 
            sm:w-fit w-full 
            sm:flex-row flex-col px-6 sm:px-0
          `}
        >
          {/* HOME */}
          <li className="font-medium text-sm sm:text-base lg:text-lg montserrat hover:text-gray-600 transition-all">
            <Link
              to="/"
              className={`${path === "/" ? "font-semibold text-purple-600" : ""}`}
            >
              Home
            </Link>
          </li>

          {/* ABOUT */}
          <li className="font-medium text-sm sm:text-base lg:text-lg montserrat hover:text-gray-600 transition-all">
            <Link
              to="/about"
              className={`${path === "/about" ? "font-semibold text-purple-600" : ""}`}
            >
              About
            </Link>
          </li>

          {/* DASHBOARD */}
          {token && (
            <li className="font-medium text-sm sm:text-base lg:text-lg montserrat hover:text-gray-600 transition-all">
              <Link
                to="/dashboard"
                className={`${path === "/dashboard" ? "font-semibold text-purple-600" : ""}`}
              >
                Dashboard
              </Link>
            </li>
          )}

          {/* SIGN UP */}
          {!token && (
            <Link to="/register" className="w-fit">
              <li className="mt-2 sm:mt-0 bg-white text-purple-700 font-semibold px-5 py-2 rounded-md shadow-md hover:bg-gray-100 transition-all cursor-pointer text-center text-xs sm:text-sm lg:text-base">
                Sign Up
              </li>
            </Link>
          )}

          {/* LOGOUT */}
          {token && (
            <button
              onClick={onLogOutHandler}
              className="mt-2 sm:mt-0 bg-rose-700 text-white font-semibold px-5 py-2 rounded-md shadow-md hover:bg-rose-800 transition-all cursor-pointer text-center text-xs sm:text-sm lg:text-base"
            >
              Log Out
            </button>
          )}
        </ul>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setNavbarOpen(!navbarOpen)}
          className="sm:hidden flex items-center"
        >
          {navbarOpen ? (
            <RxCross2 className="text-gray-700 text-3xl sm:text-3xl lg:text-4xl" />
          ) : (
            <IoIosMenu className="text-gray-700 text-3xl sm:text-3xl lg:text-4xl" />
          )}
        </button>
      </div>
    </div>
  );
};

export default Navbar;