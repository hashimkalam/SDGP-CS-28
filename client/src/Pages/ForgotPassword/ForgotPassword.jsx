import React, { useState } from "react";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

function ForgotPassword() {
  const [nextSlide, setNextSlide] = useState(false);
  const [otpValues, setOtpValues] = useState(["", "", "", ""]);
  const [otpPass, setOtpPass] = useState(false);

  const [newPassword, setNewPassword] = useState("");

  const OTP = "2468"; // Use string to compare easily
  //hi

  const styles = {
    margin: "20px",
    background:
      "linear-gradient(100deg, rgba(56, 52, 247, 0.91) -5.85%, rgba(80, 56, 237, 0.93) 109.55%)",
    color: "white",
    textTransform: "capitalize",
    padding: "10px 25px",
    borderRadius: "16px",
    fontWeight: "700",
    boxShadow: "0px 8px 21px 0px rgba(0, 0, 0, .16)",
    width: "40%",
  };

  const formSubmit = (e) => {
    e.preventDefault();

    // if (newPassword.includes("@gmail.com")) {
    setNextSlide(true);
    // }
  };

  const otpSubmit = (e) => {
    e.preventDefault();

    const enteredOtp = otpValues.join("");

    if (OTP === enteredOtp) {
      setOtpPass(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mx-auto h-screen -z-10">
      <div className="bg-[#3834F7] opacity-25 h-full w-full absolute z-0" />
      {!nextSlide ? (
        <>
          <div className="bg-white w-[50vw] z-10 p-5 shadow-2xl rounded-xl">
            <Link to="/login" className="flex mb-5 ">
              <ArrowBackIosIcon />
              <p className="font-semibold hover:underline cursor-pointer">
                go back
              </p>
            </Link>

            <form
              className="flex flex-col items-center w-[90%] mx-auto text-center"
              onSubmit={formSubmit}
            >
              <h1 className="text-3xl font-bold ">Forgotten Password</h1>

              <p className="mt-5">
                Please Enter Your Email For The OTP Message To Be Sent
              </p>

              <input
                type="email"
                placeholder="Email"
                className="link w-[60%]"
              />

              <Button style={styles} onClick={formSubmit}>
                Next
              </Button>
            </form>
          </div>
        </>
      ) : (
        <>
          {!otpPass ? (
            <>
              <div className="bg-white w-[50vw] z-10 p-5 shadow-2xl rounded-xl">
                <Link to="/login" className="flex mb-5 ">
                  <ArrowBackIosIcon />
                  <p className="font-semibold hover:underline cursor-pointer">
                    go back
                  </p>
                </Link>

                <form
                  className="flex flex-col items-center w-[90%] mx-auto text-center"
                  onSubmit={otpSubmit}
                >
                  <h1 className="text-3xl font-bold ">OTP Verification</h1>

                  <p className="mt-5">
                    Please Enter The OTP Message Sent To Your Email Address
                  </p>

                  <div className="flex mt-4">
                    {otpValues.map((value, index) => (
                      <input
                        key={index}
                        type="text"
                        pattern="\d"
                        title="Please enter a single digit"
                        maxLength="1"
                        className="link w-12 h-12 text-center mx-1"
                        required
                        value={value}
                        onChange={(e) => {
                          const newValue = e.target.value;
                          if (/^\d+$/.test(newValue) && newValue.length <= 1) {
                            const newOtpValues = [...otpValues];
                            newOtpValues[index] = newValue;
                            setOtpValues(newOtpValues);
                          }
                        }}
                      />
                    ))}
                  </div>

                  <Button style={styles} onClick={otpSubmit}>
                    Next
                  </Button>
                </form>
              </div>
            </>
          ) : (
            <>
              <div className="bg-white w-[50vw] z-10 p-5 shadow-2xl rounded-xl">
                <Link to="/login" className="flex mb-5 ">
                  <ArrowBackIosIcon />
                  <p className="font-semibold hover:underline cursor-pointer">
                    go back
                  </p>
                </Link>

                <form
                  className="flex flex-col items-center w-[90%] mx-auto text-center"
                  onSubmit={formSubmit}
                >
                  <h1 className="text-3xl font-bold mb-5">
                    Enter Your New Password
                  </h1>

                  <input
                    type="password"
                    placeholder="Password"
                    className="link"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />

                  <Button style={styles} onClick={formSubmit}>
                    Change
                  </Button>
                </form>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default ForgotPassword;