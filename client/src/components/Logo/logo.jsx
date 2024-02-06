import React from "react";
import "./logo.css";
import { useNavigate } from "react-router-dom";

export const Logo = ({ logoIcon = "images/img_logoicon.svg" }) => {

  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };
    return (
        <div className="logo" onClick={handleLogoClick}>
            <div className="overlap-group">
                <div className="elite-blu-print">EliteBluPrint</div>
                <img className="logo-icon" alt="Logo icon" src={logoIcon} />
            </div>
        </div>
    );
};
