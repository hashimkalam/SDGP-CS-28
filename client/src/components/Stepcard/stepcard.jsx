import React from "react";
import "./step.css";

const StepCard = ({ title, steps, description }) => (
  <div className="step-card">
    <div className="step-label">
      <h3 className="step-title">{title}</h3>
      <div className="text-wrapper">{steps}</div>
    </div>
    <p className="step-description">{description}</p>
    <div className="svg-holder">
      <img className="step-image" src="images/img_svg.png" />
    </div>
  </div>
);

export default StepCard;
