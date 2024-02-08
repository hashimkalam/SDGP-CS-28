import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Button, IconButton } from "@mui/material";
import AppleIcon from "@mui/icons-material/Apple";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import AddCardIcon from "@mui/icons-material/AddCard";

import pattern_img from "../assets/pattern.png";
import logInPersonImage from "../assets/login_person.png";
import signUpPersonImage from "../assets/signup_person.png";
import googleLogo from "../assets/google_logo.jpg";
import logo from "../assets/Logo.png";

import Select from "react-select";

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
  const navigate = useNavigate();

  const [loginPage, setLoginPage] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [selectOption, setSelectOption] = useState("");
  const [password, setPassword] = useState("");
  const [passPlaceholder, setPassPlaceholder] = useState(true);
  const [visibility, setVisibility] = useState(false);
  const [errorMsg, setErrorMessage] = useState(false);
  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState("");


  //console.log(selectOption.label);

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

  const submitHandler = async (e) => {
    e.preventDefault();

    if (email === "" || password === "") {
      setErrorMessage(true);

      setTimeout(() => {
        setErrorMessage(false);
      }, 3500);
    } else {
      setErrorMessage(false);

      const res = await fetch(
        !loginPage
          ? "http://localhost:3000/api/auth/signup"
          : "http://localhost:3000/api/auth/signin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      var data = await res.json();
      setMessage( () => {
        setMessage(data.message);
      });
      console.log(data);
    }
  };

  const switchScreen = (e) => {
    setUsername("");
    setEmail("");
    setSelectOption("");
    setPassword("");

    setLoginPage(!loginPage);
    {
      loginPage ? navigate("/login") : navigate("/signup");
    }
  };

  return (
    <div className="md:flex">
      <div className="lg:w-1/2 bg-white z-20 h-screen w-full">
        <Link to="/">
          <img
            src={logo}
            className="m-auto p-5 pr-8 lg:m-0 lg:p-4 lg:pb-0"
            alt=""
          />
        </Link>

        <div className="grid place-items-center h-[85vh] lg:h-[83vh]">
          <div className="displayFlex flex-col w-full -mt-[4vh]">
            <h2 className="uppercase font-bold text-2xl text-center pt-5 pb-10">
              {loginPage ? "login" : "get started now"}
            </h2>
            <form
              className="w-3/4 sm:w-2/4 md:w-3/4 displayFlex flex-col "
              onSubmit={submitHandler}
            >
              {!loginPage && (
                <div className="link ">
                  <PersonOutlineIcon />
                  <input
                    type="text"
                    placeholder="Username"
                    className="innerLink "
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                      setFormData((prevFormData) => {
                        return { ...prevFormData, username: e.target.value };
                      });
                    }}
                  />
                </div>
              )}

              <div className="link">
                <MailOutlineIcon />
                <input
                  type="email"
                  placeholder="Email"
                  className="innerLink"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setFormData((prevFormData) => {
                      return { ...prevFormData, email: e.target.value };
                    });
                  }}
                />
              </div>
              {!loginPage && (
                <div className="link py-2.5">
                  <AddCardIcon />
                  <Select
                    className="innerLink"
                    styles={customStyles}
                    options={options}
                    value={selectOption}
                    onChange={(selected) => {
                      setSelectOption(selected);
                      setFormData((prevFormData) => ({
                        ...prevFormData,
                        role: selected.value,
                      }));
                    }}
                    placeholder="Select your role"
                  />
                </div>
              )}

              <div className="link p-3 py-2">
                <LockIcon />
                <input
                  type={passPlaceholder ? "password" : "text"}
                  placeholder="Password"
                  className="innerLink mr-2"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setFormData((prevFormData) => {
                      return { ...prevFormData, password: e.target.value };
                    });
                  }}
                />

                <IconButton
                  onClick={() => {
                    setPassPlaceholder(!passPlaceholder);
                    setVisibility(!visibility);
                  }}
                >
                  {visibility ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              </div>

              {errorMsg && (
                <p className="text-red-700 font-semibold text-center">
                  {message}
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
                <Button
                  type="submit"
                  style={buttonStyles}
                  onSubmit={submitHandler}
                >
                  Login Now
                </Button>
              ) : (
                <Button
                  type="submit"
                  style={buttonStyles}
                  onSubmit={submitHandler}
                >
                  Sign Up
                </Button>
              )}
            </form>
            
            <div className="flex items-center">
              <hr className="w-[13vw] bg-[#525252] " />
              <p className="mx-4 text-[#707070]">or</p>
              <hr className="w-[13vw] bg-[#525252] " />
            </div>

            <div className="flex flex-col justify-center mt-6">
              <div className="flex flex-col sm:flex-row gap-x-2">
                <Button style={styles}>
                  <img
                    src={googleLogo}
                    className="w-6 mr-1.5"
                    alt="Google Logo"
                  />
                  Sign in with Google
                </Button>
                <Button style={styles}>
                  <AppleIcon className="mr-2" />
                  Sign in with Apple
                </Button>
              </div>

              <div className="mt-4 -mb-[4vh]">
                <p className="font-semibold text-center">
                  Don't have an account?
                  {loginPage ? (
                    <Link
                      to="/signup"
                      className="registerOptions"
                      onClick={switchScreen}
                    >
                      Sign Up
                    </Link>
                  ) : (
                    <Link
                      to="/login"
                      className="registerOptions"
                      onClick={switchScreen}
                    >
                      Log In
                    </Link>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        style={{ backgroundImage: `url(${pattern_img})` }}
        className="bg-cover hidden sm:hidden lg:flex justify-center items-center md:w-1/2"
      >
        <div className="relative md:w-[40vw] lg:w-[30vw] lg:h-[65vh] xl:h-[55vh] border border-[white] -z-1 p-5 rounded-2xl lg:text-center xl:text-left backdrop-blur-lg">
          <p className="text-white text-sm md:text-md lg:text-lg xl:text-xl font-extrabold xl:w-1/2">
            No more complex CAD operations. Describe your ideal space, and we'll
            bring it to life
          </p>

          {loginPage ? (
            <img
              src={logInPersonImage}
              className="registerImg lg:right-[-20px] xl:right-[-80px] scale-90 lg:scale-100"
              alt="Person"
            />
          ) : (
            <img
              src={signUpPersonImage}
              className="registerImg lg:right-[0px] xl:right-[-50px] scale-100"
              alt="Person"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Register;
