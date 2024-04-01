import { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { Button, Rating } from "@mui/material";

function FeedbackForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(2.5);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const ref = useRef();

  const buttonStyles = {
    background:
      "linear-gradient(100deg, rgba(56, 52, 247, 0.91) -5.85%, rgba(80, 56, 237, 0.93) 109.55%)",
    color: "white",
    textTransform: "capitalize",
    padding: "10px",
    width: "100%",
    borderRadius: "16px",
    fontWeight: "700",
    boxShadow: "0px 8px 21px 0px rgba(0, 0, 0, .16)",
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      const formData = {
        name: name,
        email: email,
        message: message,
        rating: rating,
      };

      const result = emailjs.sendForm(
        "service_qk8251g",
        "template_fb1s51z",
        e.currentTarget,
        "ppjRohwSP3-H3etYn",
        formData
      );

      setName("");
      setEmail("");
      setMessage("");
      setRating("");
      setShowConfirmation(true);
    } catch (error) {
      console.error("Error sending the form:", error);
    }
  };

  useEffect(() => {
    if (showConfirmation) {
      const timeoutId = setTimeout(() => {
        setShowConfirmation(false);
      }, 5000);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [showConfirmation]);

  const isSubmitDisabled = !(name.trim() && email.trim() && message.trim());

  return (
    <div
      className="min-h-screen bg-[#090E34] text-white font-semibold tracking-wide center"
      ref={ref}
    >
      <div className="text-5xl mb-10">Give Us Your Valuable Feedback!</div>
      <form
        className="flex flex-col w-[50vw] space-y-6"
        onSubmit={handleSubmit}
      >
        <div className="flex items-center justify-between space-x-4">
          <input
            className="formInputStyles w-[50%]"
            type="text"
            name="name"
            placeholder="Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />

          <div className="w-[50%] flex items-center">
            <p>Rate our Service</p>
            <Rating
              className="text-white mx-2 text-lg md:text-xl"
              name="rating"
              value={rating}
              onChange={(e) => {
                setRating(e.target.value);
              }}
              precision={0.5}
              sx={{ "& .MuiRating-iconFilled": { color: "#FFF" } }} // Make the stars white
            />
          </div>
        </div>
        <input
          className="formInputStyles"
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <textarea
          className="formInputStyles"
          name="message"
          placeholder="What could be improved?"
          rows={6}
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
        {showConfirmation && (
          <h1 className="flex justify-center font-semibold text-green-400 uppercase text-sm pt-1">
            Sent Successfully
          </h1>
        )}
        <Button style={buttonStyles} type="submit" disabled={isSubmitDisabled}>
          Submit
        </Button>
      </form>
    </div>
  );
}

export default FeedbackForm;
