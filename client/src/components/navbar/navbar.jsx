import React from "react";
import "./navbar.css";
import { Logo } from "../Logo/logo";
import { useNavigate } from 'react-router-dom';


const Navbar = () => {
  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate('/login');
  };

  const navigateToSignup = () => {
    navigate('/signup');
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
      <button className="login" onClick={navigateToLogin}>Login</button>
      <button className="signup" onClick={navigateToSignup} >Sign Up</button>
      </div>
    </header>
  );
};

export default Navbar;