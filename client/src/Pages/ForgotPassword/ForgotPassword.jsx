import React, { createRef, useEffect, useRef, useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

function ForgotPassword() {
  const [nextSlide, setNextSlide] = useState(false);
  const [otpValues, setOtpValues] = useState(["", "", "", ""]);
  const [otpPass, setOtpPass] = useState(false);
  const [enteredEmail, setEnteredEmail] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState("");

  const navigate = useNavigate();
  const inputRefs = useRef([]);

  useEffect(() => {
    inputRefs.current[0]?.current?.focus();
  }, []);

  for (let i = 0; i < 4; i++) {
    inputRefs.current[i] = createRef();
  }

  const handleInputChange = (e, index) => {
    const newValue = e.target.value;

    if (newValue === "") {
      // removing the values if backspace clicked
      const newOtpValues = [...otpValues];
      newOtpValues[index] = "";
      setOtpValues(newOtpValues);

      if (index > 0) {
        inputRefs.current[index - 1].current.focus();
      }
      return;
    }

    if (/^\d+$/.test(newValue) && newValue.length <= 1) {
      const newOtpValues = [...otpValues];
      newOtpValues[index] = newValue;
      setOtpValues(newOtpValues);

      // move to the next input holder
      if (index < otpValues.length - 1) {
        inputRefs.current[index + 1].current.focus();
      }
    }
  };

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

  const formSubmit = async (e) => {
    e.preventDefault();
    console.log("Entered Email:", enteredEmail);

    // Call your backend API to send OTP email
    const response = await fetch(
      "http://localhost:3000/forgotpassword/submit",
      {
        // Replace "http://localhost:3000" with the actual URL where your backend is running
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: enteredEmail }),
      }
    );
    const result = await response.json();
    console.log("API Response:", result);

    if (result.success) {
      // OTP email sent successfully, update UI or navigate to OTP verification page
      setOtpVerified(true);
      setNextSlide(true);
      const generatedOtp = result.generatedOtp;
      setGeneratedOtp(generatedOtp);
    } else {
      // Handle error case
      console.error("Error:", result.message);
    }
  };

  const otpSubmit = (e) => {
    e.preventDefault();

    const enteredOtp = otpValues.join("");

    if (generatedOtp === enteredOtp) {
      setOtpPass(true);

      // Navigate to the reset password page
      navigate("/resetpassword", { state: { email: enteredEmail } });
    } else {
      // Show an error message
      console.error("The entered OTP is not correct.");
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
                value={enteredEmail}
                onChange={(e) => setEnteredEmail(e.target.value)}
                className="link w-[60%]"
              />

              <Button style={styles} onClick={formSubmit} type="submit">
                Next
              </Button>
            </form>
          </div>
        </>
      ) : (
        <>
          {otpVerified ? (
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
                        onChange={(e) => handleInputChange(e, index)}
                        ref={inputRefs.current[index]}
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
                ></form>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default ForgotPassword;
