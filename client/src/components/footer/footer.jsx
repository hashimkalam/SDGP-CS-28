import React from "react";
import "./footer.css";
import { Logo } from "../Logo/logo";
export const Footer = () => {
  return (
    <div className="footer">
      <div>
        <Logo />
        <p className="caption">
          Analyze the available space and develop efficient
          <br />
          floor plans that maximize functionality, flow, and
          <br />
          utilization of the area.
        </p>
      </div>

      <div>
        <p className="address">NO 435, Galle Road, Colombo 03, Sri Lanka</p>
        <p className="number">(+94) 705-03-9527</p>
      </div>

      <div className="socials">
        <h1 >FOLLOW US</h1>
        <p>Behance</p>
        <p>Facebook</p>
        <p>Twitter</p>
        <p>Linkedin</p>
      </div>
    </div>
  );
};

export default Footer;
