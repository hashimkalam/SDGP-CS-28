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

import { useSnackbar } from "notistack";
import RegisterImage from "../../components/RegisterImage/RegisterImage";

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
  const location = useLocation();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const [loginPage, setLoginPage] = useState(location.pathname === "/login");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passPlaceholder, setPassPlaceholder] = useState(true);
  const [visibility, setVisibility] = useState(false);
  const [formData, setFormData] = useState({});

  const [showRoleSelectionModal, setShowRoleSelectionModal] = useState(false);
  const selectedOption = useSelector(selectSelectedOption);

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

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern = /^(?=.*\d)/;

    if (email === "" || password === "") {
      enqueueSnackbar("Fill in the containers!", {
        variant: "error",
      });
      return;
    }
    if (location.pathname === "/signup") {
      if (username.length < 4) {
        enqueueSnackbar("Username should be at least 4 characters!", {
          variant: "error",
        });
        return;
      } else if (username.includes(" ")) {
        enqueueSnackbar("Username should not contain spaces!", {
          variant: "error",
        });
        return;
      }
    }

    if (!emailPattern.test(email)) {
      enqueueSnackbar("Enter a valid email address!", {
        variant: "error",
      });
      return;
    }

    if (password === "") {
      setErrorWithTimeout("Password is required.");
      return;
    }

    if (location.pathname === "/signup") {
      if (password.length < 8) {
        enqueueSnackbar("Password must be at least 8 characters long!", {
          variant: "error",
        });
        return;
      }
      if (!passwordPattern.test(password)) {
        enqueueSnackbar("Password must contain at least one digit!", {
          variant: "error",
        });
        return;
      }
    }

    try {
      dispatch(signInStart());

      const res = await fetch(
        loginPage
          ? "https://sdgp-cs-28-backend-final-cp24t3kdkq-uc.a.run.app/api/auth/signin"
          : "https://sdgp-cs-28-backend-final-cp24t3kdkq-uc.a.run.app/api/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();
      console.log("data", data);

      if (res.ok === false) {
        dispatch(signInFailure(data.message));
        enqueueSnackbar(data.message, {
          variant: "error",
        });
        return;
      }
      dispatch(signInSuccess(data));

      enqueueSnackbar(data.message, {
        variant: "success",
      });

      if (res.ok) {
        // success message
        if (location.pathname === "/login") {
          enqueueSnackbar("Logged In Successfully", {
            variant: "success",
          });
        } else {
          enqueueSnackbar("Signed In Successfully", {
            variant: "success",
          });
        }
        navigate("/workspace");
      }
    } catch (error) {
      console.error(error);
      dispatch(signInFailure(error));
      enqueueSnackbar(error, {
        variant: "error",
      });
    }
  };

  const handleGoogleButton = async () => {
    setShowRoleSelectionModal(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (showRoleSelectionModal) {
        const option = await selectedOption;
        if (option || location.pathname === "/login") {
          setShowRoleSelectionModal(false);

          try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);

            const result = await signInWithPopup(auth, provider);

            if (result && result.user) {
              // User exists, proceed with login
              const res = await fetch(
                "https://sdgp-cs-28-backend-final-cp24t3kdkq-uc.a.run.app/api/auth/google",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    name: result.user.displayName,
                    email: result.user.email,
                    photo: result?.user?.photoURL,
                    role: option,
                  }),
                }
              );

              if (res.ok) {
                const data = await res.json();
                dispatch(signInSuccess(data));
                console.log(data);

                // success message
                {
                  location.pathname === "/login"
                    ? enqueueSnackbar("Logged In Successfully", {
                        variant: "success",
                      })
                    : enqueueSnackbar("Signed In Successfully", {
                        variant: "success",
                      });
                }
                navigate("/workspace");
              } else {
                enqueueSnackbar("Error. Create an Account First!", {
                  variant: "error",
                });
                dispatch(setSelectedOption(""));

                // redirect to signup page
                setTimeout(() => {
                  setLoginPage(false);
                  navigate("/signup");
                }, 1000);
              }
            } else {
              // User does not exist, handle this scenario
              console.log("User does not have an account or sign-in failed");
            }
          } catch (error) {
            console.log("Could not login with google: " + error);
          }
        }
        dispatch(setSelectedOption("")); // empty it
      }
    };

    fetchData();
  }, [showRoleSelectionModal, selectedOption]);

  const handleRoleSelection = (option) => {
    dispatch(setSelectedOption(option));
    setShowRoleSelectionModal(false);
  };

  const switchScreen = (e) => {
    setUsername("");
    setEmail("");
    dispatch(setSelectedOption(""));
    setPassword("");

    setLoginPage(!loginPage);
  };

  console.log(selectedOption);

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
                    className="innerLink"
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
                    value={selectedOption}
                    onChange={(selected) => {
                      dispatch(setSelectedOption(selected));
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
              <hr className="w-[13vw] bg-[#525252]" />
            </div>

            <div className="flex flex-col justify-center mt-6">
              <div className="flex flex-col sm:flex-row ml-5">
                <Button style={styles} onClick={handleGoogleButton}>
                  <img
                    src={googleLogo}
                    className="w-6 mr-1.5"
                    alt="Google Logo"
                  />
                  Sign in with Google
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

      {showRoleSelectionModal && location.pathname === "/signup" && (
        <SignInModel
          handleClose={() => setShowRoleSelectionModal(false)}
          handleContinue={() => handleRoleSelection(selectedOption)}
        />
      )}
      <RegisterImage />
    </div>
  );
}

export default Register;
