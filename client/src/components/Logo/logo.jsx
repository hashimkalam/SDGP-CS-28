import React from "react";
import "./logo.css";
import { useNavigate } from "react-router-dom";

export const Logo = ({ logoIcon = "images/img_logoicon.svg" }) => {
  return (
    <div className="logo">
      <div className="overlap-group">
        <div className="elite-blu-print">EliteBluPrint</div>
        <img className="logo-icon" alt="Logo icon" src={logoIcon} />
      </div>
    </div>
  );
};

export default Logo;
