import React from "react";
import "./navbar.css";
import { Logo } from "../Logo/logo";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-scroll';

const Navbar = () => {
  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate("/login");
  };

  const navigateToSignup = () => {
    navigate("/signup");
  };

  return (
    <header className="navbar">
      <div className="logo-container">
        <Logo />
      </div>
      <ul className="nav-links">
        <li>
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
      </div>
    </header>
  );
};

export default Navbar;
