import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button, IconButton } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import pattern_img from "../../assets/pattern.png";
import resetImage from "../../assets/login_person.png";
import logo from "../../assets/Logo.png";
import Alert from "@mui/material/Alert";
import { useSnackbar } from "notistack";

// Import other necessary assets, styles, and components

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

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passPlaceholder, setPassPlaceholder] = useState(true);
  const [confirmPassPlaceholder, setConfirmPassPlaceholder] = useState(true);
  const [visibility, setVisibility] = useState(false);
  const [confirmVisibility, setConfirmVisibility] = useState(false);

  const handlePasswordVisibility = () => {
    setPassPlaceholder(!passPlaceholder);
    setVisibility(!visibility);
  };

  const handleConfirmPasswordVisibility = () => {
    setConfirmPassPlaceholder(!confirmPassPlaceholder);
    setConfirmVisibility(!confirmVisibility);
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*\d).{8,}$/;
    return regex.test(password);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!location.state) {
      console.error("No email provided.");
      return;
    }

    if (!password) {
      enqueueSnackbar("Password is required!", {
        variant: "error",
      });
      return;
    }

    if (!validatePassword(password)) {
      enqueueSnackbar(
        "Password must contain at least 8 characters and a digit!",
        {
          variant: "error",
        }
      );
      return;
    }

    if (password && !confirmPassword) {
      enqueueSnackbar("Confirm password is required!", {
        variant: "error",
      });
      return;
    }

    if (password == confirmPassword) {
      try {
        const response = await fetch(
          "http://localhost:3000/api/password/resetpassword",
          {
            // Updated URL
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: location.state.email, // Use the email from the location state
              newPassword: password,
            }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Could not reset password");
        }

        enqueueSnackbar("Password reset successful!", {
          variant: "success",
        });
        setTimeout(() => {
          navigate("/login");
        }, 3000);

        setPassword("");
        setConfirmPassword("");
      } catch (error) {
        // Handle error
        console.error(error);
        enqueueSnackbar(error.message, {
          variant: "error",
        });
      }
    } else {
      enqueueSnackbar(
        "Password reset unseccessful. Not the same password entered!",
        {
          variant: "error",
        }
      );

      setPassword("");
      setConfirmPassword("");
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
              Reset Password
            </h2>
            <form
              onSubmit={handleResetPassword}
              className="w-3/4 sm:w-2/4 md:w-3/4 displayFlex flex-col "
            >
              <div className="link p-3 py-2">
                <LockIcon />
                <input
                  type={passPlaceholder ? "password" : "text"}
                  placeholder="New Password"
                  className="innerLink mr-2"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />

                <IconButton onClick={handlePasswordVisibility}>
                  {visibility ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              </div>

              <div className="link p-3 py-2">
                <LockIcon />
                <input
                  type={confirmPassPlaceholder ? "password" : "text"}
                  placeholder="Confirm Password"
                  className="innerLink mr-2"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                />

                <IconButton onClick={handleConfirmPasswordVisibility}>
                  {confirmVisibility ? (
                    <VisibilityOffIcon />
                  ) : (
                    <VisibilityIcon />
                  )}
                </IconButton>
              </div>

              <Button
                type="submit"
                style={buttonStyles}
                onClick={handleResetPassword}
              >
                Reset Password
              </Button>
            </form>

            <div className="mt-4">
              <Link
                to="/login"
                className="text-sm text-center text-blue-700 opacity-75 hover:opacity-100 cursor-pointer"
              >
                Back to Login
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          backgroundImage: `url(${pattern_img})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="bg-cover hidden sm:hidden lg:flex justify-center items-center md:w-1/2"
      >
        <div className="relative md:w-[40vw] lg:w-[30vw] lg:h-[65vh] xl:h-[55vh] border border-[white] -z-1 p-5 rounded-2xl lg:text-center xl:text-left backdrop-blur-lg">
          <p className="text-white text-sm md:text-md lg:text-lg xl:text-xl font-extrabold xl:w-1/2">
            Reset your password and get back to your account
          </p>
          <img
            src={resetImage}
            className="registerImg lg:right-[-20px] xl:right-[-80px] scale-100 lg:scale-100 "
            alt
          />
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
