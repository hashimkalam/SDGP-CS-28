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
      : navigate("/Workspace");
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

  // let Links = [

  //   {name:"HOME", link:"/"},
  //   {name:"HOW IT WORKS", link:"/"},
  //   {name:"PRICING", link:"/"},
  // ];

  // let [open,setOpen]=useState(false);

  return (
    <header
      className={`navbar ${
        location.pathname === "/"
          ? "bg-gradient-to-r from-[#002865] to-[#004ec3] relative"
          : location.pathname === "/userprofile" || "/download"
          ? "bg-[#090E34]"
          : "bg-white"
      }`}
    >
      <div className="logo-container">
        <Logo />
      </div>
      {location.pathname == "/" && (
        <ul className="nav-links">
          <li>
            <a>
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
      <div className="login-signup">
        {currentUser ? (
          <>
            {location.pathname == "/" && (
              <button className="logout" onClick={navigateToLogout}>
                Logout
              </button>
            )}
            {location.pathname == "/workspace" && (
              <div className="space-x-5 mr-8">
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
          </>
        ) : (
          <>
            {location.pathname == "/" && (
              <>
                <button className="login" onClick={navigateToLogin}>
                  Login
                </button>
                <button className="signup" onClick={navigateToSignup}>
                  Sign Up
                </button>
              </>
            )}
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;
