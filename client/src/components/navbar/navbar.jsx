import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { Button, IconButton } from "@mui/material";
import AppleIcon from "@mui/icons-material/Apple";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import AddCardIcon from "@mui/icons-material/AddCard";

import pattern_img from "../../assets/pattern.png";
import logInPersonImage from "../../assets/login_person.png";
import signUpPersonImage from "../../assets/signup_person.png";
import googleLogo from "../../assets/google_logo.jpg";
import logo from "../../assets/Logo.png";
import Select from "react-select";
import {
  signInStart,
  signInFailure,
  signInSuccess,
  selectSelectedOption,
  setSelectedOption,
} from "../../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../../firebase";
import SignInModel from "../../components/model/SignInModel";
import { useSelector, useDispatch } from "react-redux";
import { signOut } from "firebase/auth";

const options = [
  { value: "individual", label: "Individual" },
  { value: "architect", label: "Architect" },
];

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: "#F0EDFF",
    border: "none",
    cursor: "pointer",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? "#111" : "#F0EDFF",
    cursor: "pointer",
  }),
};

function Register() {
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
  };

  console.log(selectedOption);


  const navigateToLogout = async () => {
    try {
      await fetch("http://localhost:3000/api/auth/signout");
      dispatch(signOut());
    } catch (error) {}
    navigate("/login");
  };

  return (
    <header className="navbar">
      <div className="logo-container">
        <Logo />
      </div>
      <ul className="nav-links">
        <li>
          <a href="home-section">
            <span>Home</span>
          </a>
        </li>
        <li>
          <a href="#how-it-works-section">
            <span>How it works</span>
          </a>
        </li>
        <li>
          <a href="#pricing-section">
            <span>Pricing</span>
          </a>
        </li>
      </ul>
      <div className="login-signup">
        <button className="login" onClick={navigateToLogin}>
          Login
        </button>
        <button className="signup" onClick={navigateToSignup}>
          Sign Up
        </button>
      </div>
    </header>
  );
};

export default Navbar;
