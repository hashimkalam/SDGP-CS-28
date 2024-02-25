import React from "react";
import "./footer.css";
import { Logo } from "../Logo/logo";
export const Footer = () => {
  return (
    <div className="bg-custom-blue text-white px-8 py-12 md:flex md:justify-between md:items-center">
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

      <div className="mt-7 md:mt-0 space-y-2 pt-10">
        <p className="text-sm">NO 435, Galle Road, Colombo 03, Sri Lanka</p>
        <p className="text-sm">(+94) 705-03-9527</p>
        <p className="text-sm">elitebluprint.dev@gmail.com</p>
      </div>

      <div className="mt-6 md:mt-0 space-y-2 mr-4 pr-4">
        <h1 className="text-lg font-semibold">FOLLOW US</h1>
        <p className="text-sm">Behance</p>
        <p className="text-sm">Facebook</p>
        <p className="text-sm">Twitter</p>
        <p className="text-sm">LinkedIn</p>
      </div>
    </div>
  );
};

export default Footer;
