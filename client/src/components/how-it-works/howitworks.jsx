import React from "react";
import Stepcard from "../Stepcard/stepcard";
import "./how-it-works.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const steps = [
  {
    title: "Input text description",
    steps: "1",
    description:
      "Ditch the blueprints, grab your keyboard. EliteBluPrint turns your natural language vision into detailed floor plans. No jargon, no fuss, just pure imagination",
  },
  {
    title: "Generate plan",
    steps: "2",
    description:
      "From Wishful Thinking to Stunning Renderings: Watch your dream unfold as EliteBluPrint weaves your words into a visual masterpiece.",
  },
  {
    title: "Connect with architects",
    steps: "3",
    description:
      "Dont stop at the blueprints! Consult with seasoned professionals who refine your vision, ensure code compliance, and guide you from dream to reality.",
  },
];

const HowItWorks = () => {
  const currentUser = useSelector((state) => state.user.currentUser);

  const navigate = useNavigate();

  const handleButtonClick = () => {
    {
      currentUser ? navigate("/workspace") : navigate("/signup");
    }
  };

  return (
    <div className="how-it-works-section" id="how_it_works">
      <div className="m-4 w-144 flex items-center justify-center mx-auto">
    <p className="text-white font-inter font-bold text-2xl  lg:text-3xl leading-relaxed text-center align-middle w-full">
      Master the Magic: Your Guide to Generating Perfect Floor Plans
    </p>
  </div>
      <div className="steps-container">
        {steps.map((step, index) => (
          <Stepcard
            key={index}
            title={step.title}
            steps={step.steps}
            description={step.description}
          />
        ))}
      </div>
      <button className="custom-button" onClick={handleButtonClick}>
        Try It Out
      </button>
    </div>
  );
};

export default HowItWorks;
