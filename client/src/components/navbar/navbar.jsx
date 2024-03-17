import React, { useState } from "react";
import "./navbar.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signOut } from "../../redux/user/userSlice";
import { Logo } from "../Logo/logo";

import darkLogo from "../../../public/images/Logo.png";
import { motion } from "framer-motion";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const navigateToProfileOrDashboard = () => {
    currentUser.user.role === "architect"
      ? navigate("/dashboard")
      : navigate("/userprofile");
  };

  const navigateToLogin = () => {
    navigate("/login");
  };

  const navigateToSignup = () => {
    navigate("/signup");
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  const navigateToLogout = async () => {
    try {
      await fetch("https://sdgp-cs-28-backend-final-cp24t3kdkq-uc.a.run.app/api/auth/signout");
      dispatch(signOut());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={`navbar text-white flex items-center justify-between py-4 md:px-4 px-4 ${
        location.pathname === "/"
          ? "relative bg-gradient-to-r from-[#002865] to-[#004ec3]"
          : location.pathname === "/userprofile" ||
            location.pathname === "/download"
          ? "bg-[#090E34]"
          : ""
      }`}
    >
      {location.pathname === "/dashboard" ? (
        <img
          src={darkLogo}
          onClick={() => navigate("/")}
          className="cursor-pointer"
          alt="Logo"
        />
      ) : (
        <motion.a
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="cursor-pointer"
          onClick={handleLogoClick}
        >
          <Logo />
        </motion.a>
      )}

      <div className="text-3xl space-x-3 absolute right-8 top-8 cursor-pointer md:hidden flex">
        {currentUser?.user && (
          <div className="flex items-center">
            <img
            // if no profile picture is available, use a default image profile-user
              src={currentUser?.user?.profilePicture || "/images/profile-user.png"}
              alt="profilePicture"
              className="h-9 w-9 md:mr-2 rounded-full object-cover cursor-pointer"
              onClick={navigateToProfileOrDashboard}
            />
          </div>
        )}

        {location.pathname !== "/userprofile" &&
          location.pathname !== "/architectpanel" &&
          location.pathname !== "/download" && (
            <div onClick={() => setOpen(!open)} className="flex items-center">
              <ion-icon name={open ? "close" : "menu"}></ion-icon>
            </div>
          )}
      </div>

      {location.pathname == "/" && (
        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className={`md:flex justify-between md:items-center md:text-white text-[#090E34] font-semibold md:pb-0 pb-10 absolute md:static md:z-auto z-[-1] left-0 md:w-[38%] w-[100%] 
        md:pl-0 pl-7 md:pr-0 pr-9 transition-all duration-500 ease-in  ${
          open ? "top-20 bg-white" : "top-[-490px]"
        }`}
        >
          <li className="md:my-0 my-5">
            <a className="transition-all duration-500 cursor-pointer md:text-xl font-Inter-Regular text-lg">
              <span>HOME</span>
            </a>
          </li>
          <li className="md:my-0 my-5">
            <a
              href="#how_it_works"
              className="transition-all duration-500 md:text-xl font-Inter-Regular text-lg"
            >
              <span>HOW IT WOKRS</span>
            </a>
          </li>
          <li className="md:my-0 my-5">
            <a
              href="#pricing"
              className="transition-all duration-500 md:text-xl font-Inter-Regular text-lg"
            >
              <span>PRICING</span>
            </a>
          </li>

          {/* Buttons for small devices */}

          <div className="md:hidden">
            {currentUser ? (
              <>
                {/* Looged-in users */}

                <div className="flex items-center mt-6 space-x-4">
                  <button
                    className="bg-[#002865] text-white md:text-xl text-lg font-Inter-Regular font-semibold py-2 px-6 rounded-full w-full hover:bg-[#004EC3] duration-500"
                    onClick={navigateToLogout}
                  >
                    LOGOUT
                  </button>

                  <div className="text-[#1d2144] font-Inter-Regular text-lg">
                    {currentUser?.user?.username}
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* unregistered */}

                <div className="flex-col mt-6 space-y-5">
                  <button
                    className="bg-[#002865] text-white md:text-xl text-lg font-Inter-Regular font-semibold py-2 px-6 rounded-full w-full hover:bg-[#004EC3] duration-500"
                    onClick={navigateToLogin}
                  >
                    LOGIN
                  </button>
                  <button
                    className="bg-[#002865] text-white md:text-xl text-lg font-Inter-Regular font-semibold py-2 px-6 rounded-full w-full hover:bg-[#004EC3] duration-500"
                    onClick={navigateToSignup}
                  >
                    SIGNUP
                  </button>
                </div>
              </>
            )}
          </div>
        </motion.ul>
      )}

      {currentUser ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="md:flex items-center hidden"
        >
          {location.pathname == "/" && (
            <button
              className="bg-white text-custom-blue md:text-xl text-lg font-Inter-Regular font-semibold py-2 px-6 rounded-full md:ml-8 md:mr-4 mr-2 w-[140px] hover:bg-[#fff] duration-500"
              onClick={navigateToLogout}
            >
              LOGOUT
            </button>
          )}
          {location.pathname == "/workspace" && (
            <div className="space-x-4 mr-8">
              {currentUser?.user?.role === "architect" ? (
                <button
                  onClick={() => navigate("/dashboard")}
                  className="bg-[#0065FF]/85 font-Inter-Regular hover:bg-[#0065FF] duration-150 ease-out text-white p-3 rounded-lg"
                >
                  Navigate To Dashboard
                </button>
              ) : (
                <button
                  onClick={() => navigate("/download")}
                  className="bg-[#0065FF]/85 font-Inter-Regular hover:bg-[#0065FF] duration-150 ease-out text-white p-3 rounded-lg"
                >
                  Explore Achitect Consultatiom
                </button>
              )}
            </div>
          )}

          {location.pathname == "/dashboard" && (
            <button
              className="justify-center self-start px-8 py-4 mr-4 font-Inter-Regular font-semibold leading-6 text-center text-white text-lg rounded-md bg-[#1d2144] max-md:px-5 focus:outline-none"
              onClick={() => navigate("/workspace")}
            >
              Generate Plan
            </button>
          )}
          <img
            src={currentUser?.user?.profilePicture}
            alt="profilePicture"
            className="h-9 w-9 md:mr-2 rounded-full object-cover cursor-pointer"
            onClick={navigateToProfileOrDashboard}
          />
        </motion.div>
      ) : (
        <div className="md:flex md:flex-row flex-col md:my-0 my-7 items-center">
          {location.pathname === "/" && (
            <div className="md:flex items-center space-x-4 hidden">
              <button
                className="bg-white text-custom-blue md:text-xl text-lg font-Inter-Regular font-semibold py-2 px-6 rounded-full md:mr-1 mr-2 w-[140px] hover:bg-[#004EC3] duration-500"
                onClick={navigateToLogin}
              >
                LOGIN
              </button>
              <button
                className="bg-white text-custom-blue md:text-xl text-lg font-Inter-Regular font-semibold py-2 px-6 rounded-full md:mr-1 mr-2 w-[140px] hover:bg-[#004EC3] duration-500"
                onClick={navigateToSignup}
              >
                SIGNUP
              </button>
            </div>
          )}
        </div>
      )}

      {open && currentUser && (
        <div className="md:hidden justify-between flex-col z-50 items-center mt-4 absolute top-20 left-0 w-full bg-white transition-all duration-500 ease-in">
          {(location.pathname === "/workspace" ||
            location.pathname === "/download") && (
            <div className="flex-col items-center mt-10  pl-7 pr-9 pb-10 space-y-4">
              {currentUser?.user?.role === "architect" ? (
                <a
                  onClick={() => navigate("/dashboard")}
                  className="bg-[#0B113A] uppercase text-white text-center font-semibold font-Inter-Regular hover:bg-[#0065FF] duration-150 ease-out  py-2 px-6 rounded-full block"
                >
                  dashboard
                </a>
              ) : (
                <a
                  onClick={() => navigate("/download")}
                  className="bg-[#0B113A] text-white text-center font-semibold font-Inter-Regular hover:bg-[#0065FF] duration-150 ease-out  py-2 px-6 rounded-full block"
                >
                  ARCHITECT CONSULTATION
                </a>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
