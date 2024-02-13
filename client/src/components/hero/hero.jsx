import React from "react";
import "./hero.css";
function Hero() {
  return (
    <div className="hero-section">
      <div className="box">
        <div className="hero-content">
          <p className="build-a-space-that">
            BUILD A SPACE THAT REFLECTS YOUR UNIQUE STYLE AND NEEDS,
            EFFORTLESSLY WITH A DESCRIPTION USING ELITEBLUPRINT
          </p>
          <div className="overlap-group">
            <div className="text-wrapper">Unleash Your Inner Architect</div>
            <img
              className="glow-mark"
              alt="Glow mark"
              src="images/glow-mark.svg"
            />
          </div>
        </div>
      </div>
      <div className="image">
        <img className="hero-svg" alt="Hero svg" src="images/img_herosvg.png" />
      </div>
    </div>
  );
}

export default Hero;
