import React, { useState } from "react";
import "./navbar.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signOut } from "../../redux/user/userSlice";
import Logo from "../../assets/Logo.png";

const Navbar = () => {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const navigateToProfileOrDashboard = () => {
    currentUser.user.role === "architect"
      ? navigate("/dashboard")
      : navigate("/workspace");
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
      await fetch("http://localhost:3000/api/auth/signout");
      dispatch(signOut());
    } catch (error) {
      console.log(error);
    }
  };

  let [open, setOpen] = useState(false);

  return (
    <div
      className={`navbar text-white flex items-center justify-between py-4 md:px-4 px-4 ${
        location.pathname === "/"
          ? "relative bg-gradient-to-r from-[#002865] to-[#004ec3]"
          : location.pathname === "/userprofile" &&
            location.pathname === "/download" &&
            "bg-[#090E34]"
      }`}
    >
      <a className="cursor-pointer " onClick={handleLogoClick} href="">
        <img src={Logo} alt="Logo" className="invert" />
      </a>

      <div
        onClick={() => setOpen(!open)}
        className="text-3xl absolute right-8 top-8 cursor-pointer md:hidden"
      >
        <ion-icon name={open ? "close" : "menu"}></ion-icon>
      </div>

      {location.pathname == "/" && (
        <ul
          className={`md:flex justify-evenly md:items-center font-semibold md:pb-0 pb-10 absolute md:static md:z-auto z-[-1] left-0 md:w-[60%] w-full 
        md:pl-0 pl-7 md:pr-0 pr-9 transition-all duration-500 ease-in  ${
          open ? "top-20" : "top-[-490px]"
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

          <div className="md:hidden flex-col mt-6 space-y-5">
            <button
              className="bg-white/85 text-[#0B113A] md:text-xl text-lg font-Inter-Regular font-semibold py-2 px-6 rounded-full w-full hover:bg-[fff] duration-500"
              onClick={navigateToLogin}
            >
              LOGIN
            </button>
            <button
              className="bg-white/85 text-[#0B113A] md:text-xl text-lg font-Inter-Regular font-semibold py-2 px-6 rounded-full w-full hover:bg-[fff] duration-500"
              onClick={navigateToSignup}
            >
              SIGNUP
            </button>
          </div>
        </ul>
      )}

      {currentUser ? (
        <div className="flex items-center">
          {location.pathname == "/" && (
            <button
              className="bg-white/85 text-[#0B113A] md:text-xl text-lg font-Inter-Regular font-semibold py-2 px-6 rounded-full md:ml-8 md:mr-4 mr-2 w-[140px] hover:bg-[#fff] duration-500"
              onClick={navigateToLogout}
            >
              LOGOUT
            </button>
          )}
          {location.pathname == "/workspace" && (
            <div className="space-x-4 mr-8">
              <button className="bg-[#0065FF]/85 font-Inter-Regular hover:bg-[#0065FF] duration-150 ease-out text-white p-3 rounded-lg">
                Explore Achitect Consultatiom
              </button>
              <button className="bg-[#0065FF]/85 font-Inter-Regular hover:bg-[#0065FF] duration-150 ease-out text-white p-3 rounded-lg">
                Download
              </button>
            </div>
          )}
          <img
            src={currentUser?.user?.profilePicture}
            alt="profilePicture"
            className="h-9 w-9 md:mr-2 rounded-full object-cover cursor-pointer"
            onClick={navigateToProfileOrDashboard}
          />
        </div>
      ) : (
        <div className="md:flex md:flex-row flex-col md:my-0 my-7 items-center">
          {location.pathname === "/" && (
            <div className="md:flex items-center space-x-4 hidden">
              <button
                className="bg-[#002865] text-white md:text-xl text-lg font-Inter-Regular font-semibold py-2 px-6 rounded-full md:mr-1 mr-2 w-[140px] hover:bg-[#004EC3] duration-500"
                onClick={navigateToLogin}
              >
                LOGIN
              </button>
              <button
                className="bg-[#002865] text-white md:text-xl text-lg font-Inter-Regular font-semibold py-2 px-6 rounded-full md:mr-1 mr-2 w-[140px] hover:bg-[#004EC3] duration-500"
                onClick={navigateToSignup}
              >
                SIGNUP
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
