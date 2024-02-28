import React from "react";
import "./navbar.css";
import { Logo } from "../Logo/logo";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signOut } from "../../redux/user/userSlice";

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

  const navigateToLogout = async () => {
    try {
      await fetch("http://localhost:3000/api/auth/signout");
      dispatch(signOut());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header
      className={`navbar flex items-center justify-between p-5 ${
        location.pathname === "/"
          ? "bg-gradient-to-r from-[#002865] to-[#004ec3] relative"
          : location.pathname === "/userprofile" || "/download"
          ? "bg-[#090E34]"
          : "bg-white"
      }`}
    >
      <div>
        <Logo />
      </div>

      {location.pathname == "/" && (
        <ul className="nav-links text-white text-lg lg:text-xl flex items-center justify-evenly w-[100%] font-semibold">
          <li>
            <a className="cursor-pointer">
              <span>Home</span>
            </a>
          </li>
          <li>
            <a href="#how_it_works">
              <span>How it works</span>
            </a>
          </li>
          <li>
            <a href="#pricing">
              <span>Pricing</span>
            </a>
          </li>
        </ul>
      )}

      {currentUser ? (
        <div className="flex items-center space-x-4">
          {location.pathname == "/" && (
            <button
              className="text-[#0b113a] bg-white font-semibold text-xl rounded-xl px-6 py-2"
              onClick={navigateToLogout}
            >
              Logout
            </button>
          )}
          {location.pathname == "/workspace" && (
            <div className="space-x-4 mr-8">
              <button className="bg-[#0065FF]/85 hover:bg-[#0065FF] duration-150 ease-out text-white p-3 rounded-lg">
                Explore Achitect Consultatiom
              </button>
              <button className="bg-[#0065FF]/85 hover:bg-[#0065FF] duration-150 ease-out text-white p-3 rounded-lg">
                Download
              </button>
            </div>
          )}
          <img
            src={currentUser?.user?.profilePicture}
            alt="profilePicture"
            className="h-9 w-9 rounded-full object-cover cursor-pointer"
            onClick={navigateToProfileOrDashboard}
          />
        </div>
      ) : (
        <div className="flex items-center">
          {location.pathname == "/" && (
            <div className="flex items-center space-x-4">
              <button
                className="text-[#0b113a] bg-white font-semibold text-xl rounded-xl px-6 py-2"
                onClick={navigateToLogin}
              >
                Login
              </button>
              <button
                className="text-[#0b113a] bg-white font-semibold text-xl rounded-xl px-6 py-2"
                onClick={navigateToSignup}
              >
                SignUp
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
