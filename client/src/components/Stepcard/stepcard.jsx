import React from "react";
import "./step.css";

const StepCard = ({ title, steps, description }) => (
  <div className="step-card text-white rounded-2xl transform transition duration-500 ease-in-out hover:scale-105">
    <div className="step-label">
      <h3 className="text-white font-inter text-lg sm:text-xl md:text-2xl lg:text-3xl leading-9 absolute left-16 ">{title}</h3>
      <div className="text-wrapper">{steps}</div>
    </div>
    <p className="step-description text-md md:text-lg px-8 md:px-12">
      {description}
    </p>
    <div className="svg-holder">
      <img className="step-image" src="images/img_svg.png" />
    </div>
  </div>
);

export default StepCard;
