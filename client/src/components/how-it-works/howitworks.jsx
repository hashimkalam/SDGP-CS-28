import React from "react";
import Stepcard from "../Stepcard/stepcard";
import "./how-it-works.css";
import { useNavigate } from "react-router-dom";

const HowItWorks = () => {
  const steps = [
    {
      title: "Input text description",
      steps: "1",
      description:"Ditch the blueprints, grab your keyboard. EliteBluPrint turns your natural language vision into detailed floor plans. No jargon, no fuss, just pure imagination",
    },
    {
      title: "Generate floor plan",
      steps: "2",
      description:"From Wishful Thinking to Stunning Renderings: Watch your dream unfold as EliteBluPrint weaves your words into a visual masterpiece.",
    },
    {
      title: "Connect with architects",
      steps: "3",
      description:"Dont stop at the blueprints! Consult with seasoned professionals who refine your vision, ensure code compliance, and guide you from dream to reality.",
    },
  ];

  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/signup");
  };

  return (
    <div className="how-it-works-section">
      <div className="label">
        <p className="heading-simple-and">
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
      <button
        className="custom-button"
        onClick={handleButtonClick}
      >
        Try It Out
      </button>
    </div>
  );
};

export default HowItWorks;
