import React from "react";
import "./navbar.css";
import { Logo } from "../Logo/logo";
import { useNavigate } from "react-router-dom";
<<<<<<< HEAD
import { Link } from 'react-scroll';
=======
import { useSelector, useDispatch } from "react-redux";
import { signOut } from "../../redux/user/userSlice";
>>>>>>> loshan

const Navbar = () => {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
<<<<<<< HEAD
=======
  };


  const navigateToLogout = async () => {
    try {
      await fetch("http://localhost:3000/api/auth/signout");
      dispatch(signOut());
    } catch (error) {
      console.log(error);
    }
>>>>>>> loshan
  };

  return (
    <header className="navbar">
      <div className="logo-container">
        <Logo />
      </div>
      <ul className="nav-links">
        <li>
<<<<<<< HEAD
        <Link
            activeClass="active"
            to="hero-section"
            spy={true}
            smooth={true}
            offset={-100}
            duration={200}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            activeClass="active"
            to="how-it-works-section"
            spy={true}
            smooth={true}
            offset={-90}
            duration={200}
          >
            How It Works
          </Link>
        </li>
        <li>
        <Link
            activeClass="active"
            to="pricing-section"
            spy={true}
            smooth={true}
            offset={-90}
            duration={200}
          >
            Pricing
          </Link>
        </li>
      </ul>
      <div className="login-signup">
        <button className="login" onClick={navigateToLogin}>
          Login
        </button>
        <button className="signup" onClick={navigateToSignup}>
          Sign Up
        </button>
=======
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
      <div className="login-signup">
        {currentUser ? (
          <>
            <button className="logout" onClick={navigateToLogout}>
              Logout
            </button>
            <img
              src={currentUser?.user?.profilePicture}
              alt="profilePicture"
              className="h-9 w-9 rounded-full object-cover"
              onClick={navigateToProfileOrDashboard}
            />
          </>
        ) : (
          <>
            <button className="login" onClick={navigateToLogin}>
              Login
            </button>
            <button className="signup" onClick={navigateToSignup}>
              Sign Up
            </button>
          </>
        )}
>>>>>>> loshan
      </div>
    </header>
  );
};

export default Navbar;
