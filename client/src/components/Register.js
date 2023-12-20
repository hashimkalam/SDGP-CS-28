import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "@mui/material";
import AppleIcon from "@mui/icons-material/Apple";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

import pattern_img from "../assets/pattern.png";
import logInPersonImage from "../assets/login_person.png";
import signUpPersonImage from "../assets/signup_person.png";
import googleLogo from "../assets/google_logo.jpg";

function Register() {
  const navigate = useNavigate();

  const [loginPage, setLoginPage] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMessage] = useState(false);

  const styles = {
    border: "1px solid #d9d9d9",
    padding: "8px 10px",
    color: "black",
    textTransform: "capitalize",
    fontFamily: "poppins",
    borderRadius: "10px",
    margin: "5px 10px",
  };

  const buttonStyles = {
    margin: "20px",
    background:
      "linear-gradient(100deg, rgba(56, 52, 247, 0.91) -5.85%, rgba(80, 56, 237, 0.93) 109.55%)",
    color: "white",
    textTransform: "capitalize",
    padding: "10px 25px",
    borderRadius: "16px",
    fontWeight: "700",
    boxShadow: "0px 8px 21px 0px rgba(0, 0, 0, .16)",
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (username === "" || password === "") {
      setErrorMessage(true);

      setTimeout(() => {
        setErrorMessage(false);
      }, 3500);
    } else {
      setErrorMessage(false);

      setUsername("");
      setPassword("");
    }
  };

  return (
    <div
      style={{ backgroundImage: `url(${pattern_img})` }}
      className="inline md:flex min-h-screen bg-cover bg-center"
    >
      <div className="bg-[#3834F7] opacity-50 h-full w-[0vw] md:w-full absolute z-0" />
      <div className="h-screen w-full lg:w-1/2 bg-white  justifyCenter flex-col  z-20 ">
        <Link to="/" className="fixed left-5 top-5 sm:left-10 sm:top-10 ">
          <button className="bg-blue-500 hover:bg-blue-600 transition-all text-white py-1 pl-2 md:p-2 md:pl-4 rounded-md">
            <ArrowBackIosIcon />
          </button>
        </Link>

        <h2 className="uppercase font-bold text-2xl text-center py-10">
          {loginPage ? "login" : "get started now"}
        </h2>
        <form
          className="w-3/4 sm:w-2/4 md:w-3/4 justifyCenter flex-col "
          onSubmit={submitHandler}
        >
          <input
            type="text"
            placeholder="Username"
            className="link"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {!loginPage && (
            <input
              type="text"
              placeholder="Email"
              className="link"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          )}

          <input
            type="password"
            placeholder="Password"
            className="link"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {errorMsg && (
            <p className="text-red-700 font-semibold text-center">
              {loginPage
                ? "Please fill in both username and password"
                : "Please fill in all the containers"}
            </p>
          )}

          {loginPage && (
            <Link
              to="/forgotpassword"
              className="text-sm text-center text-blue-700 opacity-75 hover:opacity-100 cursor-pointer"
            >
              forgot password?
            </Link>
          )}

          {loginPage ? (
            <Button type="submit" style={buttonStyles} onSubmit={submitHandler}>
              Login Now
            </Button>
          ) : (
            <Button type="submit" style={buttonStyles} onSubmit={submitHandler}>
              Sign Up
            </Button>
          )}
        </form>
        <div className="flex items-center">
          <hr className="w-[13vw] bg-[#525252] " />
          <p className="mx-4 text-[#707070]">or</p>
          <hr className="w-[13vw] bg-[#525252] " />
        </div>
        <div className="flex flex-col justify-center mt-8">
          <div className="flex flex-col sm:flex-row gap-x-2">
            <Button style={styles}>
              <img src={googleLogo} className="w-6 mr-1.5" />
              Sign in with Google
            </Button>
            <Button style={styles}>
              <AppleIcon className="mr-2" />
              Sign in with Apple
            </Button>
          </div>

          <div className="my-4">
            <p className="font-semibold text-center">
              Don't have an account?
              {loginPage ? (
                <Link
                  to="/signup"
                  className="registerOptions"
                  onClick={() => {
                    setLoginPage(false);
                    navigate("/signup");
                  }}
                >
                  Sign Up
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="registerOptions"
                  onClick={() => {
                    setLoginPage(true);
                    navigate("/login");
                  }}
                >
                  Log In
                </Link>
              )}
            </p>
          </div>
        </div>
      </div>

      <div className="hidden sm:hidden lg:flex justify-center items-center   w-full md:w-1/2 bg-gradient-to-tr from-[#006BFF] via-transparent to-[#01193D]">
        <div className="relative bg-[rgba(255, 255, 255, 0.21)] md:w-[40vw] lg:w-[30vw] lg:h-[65vh] xl:h-[55vh] border border-[white] -z-1 p-5 rounded-2xl lg:text-center xl:text-left backdrop-blur-lg">
          <p className="text-white text-sm md:text-md lg:text-lg xl:text-xl font-extrabold xl:w-1/2">
            No more complex CAD operations. Describe your ideal space, and we'll
            bring it to life
          </p>

          {loginPage ? (
            <img
              src={logInPersonImage}
              className="registerImg lg:right-[-20px] xl:right-[-80px] scale-90 lg:scale-100"
            />
          ) : (
            <img
              src={signUpPersonImage}
              className="registerImg lg:right-[0px] xl:right-[-50px] scale-100"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Register;
