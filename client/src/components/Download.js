import { Button } from "@mui/material";
import React from "react";

import tick_image from "../assets/tick_svg.svg";
import person_image from "../assets/download_person.png";

const options = [
  { text: "Premium quality" },
  { text: "DXF Format" },
  { text: "Editable in any CAD software" },
];

function Download() {
  const buttonStyles = {
    background: "rgba(0, 101, 255, .75)",
    color: "#fff",
    padding: "13px",
    "&:hover": {
      background: "rgba(0, 101, 255, 1)",
    },
  };

  return (
    <div className="max-w-[1560px] mx-auto pt-28 min-h-screen overflow-hidden lg:overflow-auto flex flex-col lg:flex-row text-white p-10">
      <div className="lg:flex-[.5] flex flex-col justify-center -mt-14 relative">
        <h1 className="text-center lg:text-left text-[40px] font-semibold">
          Your Dream Home Awaits! Download Your Floor Plan Now.
        </h1>
        <p className="text-center lg:text-left mx-auto lg:mx-0 text-[#959cb1] text-[18px] mb-12 mt-3 w-[80%]">
          Celebrate your freshly minted masterpiece! Take the first step from
          dream to reality by downloading your personalized floor plan.
        </p>

        <div className="flex justify-center lg:justify-start">
          <Button sx={buttonStyles}>Download Now</Button>
        </div>

        <div className="space-y-5 mt-10 sm:ml-12 lg:ml-0 flex flex-col justify-center">
          {options.map((option, index) => (
            <div className="flex items-center w-full justify-center sm:justify-start space-x-3 sm:w-[25%] lg:w-[35%] mt-10 lg:mt-0">
              <img
                key={index}
                src={tick_image}
                alt="Tick Image"
                className="p-[12px] bg-gray-500/25"
              />
              <p className="text-[#959CB1]">{option.text}</p>
            </div>
          ))}

          <img
            src={person_image}
            alt="Person Image"
            className="absolute -bottom-32 lg:-bottom-10 right-0 lg:right-10 xl:right-20 w-[250px] lg:w-[275px] xl:w-[300px] hidden sm:block"
          />
        </div>
      </div>

      <div className="mt-24 lg:-mt-12 lg:flex-[.5] displayFlex flex-col">
        <div className="space-y-5 pt-20 p-10 lg:p-10 w-full sm:w-[80%] lg:w-[70%]">
          <div className="flex space-x-5 h-[12vh]">
            <div className="bg-[#4A6CF7]/10 hover:bg-[#4A6CF7]/20 hoverEffect" />
            <div className="bg-[#fff]/20 hover:bg-[#fff]/30 hoverEffect" />
            <div className="bg-[#0065FF]/20 hover:bg-[#0065FF]/30 hoverEffect" />
          </div>
          <div className="grid grid-cols-3 space-x-3 h-[20vh] ">
            <div className="col-span-2 bg-[#fff]/10 hover:bg-[#fff]/20 mr-2 hoverEffect" />
            <div className="bg-[#fff]/20 hover:bg-[#fff]/30 hoverEffect" />
          </div>
        </div>

        <div className="w-[80%] mt-10">
          <h1 className="text-center lg:text-left text-[25.6px] lg:text-[32px] italic font-semibold">
            Ready to refine your masterpiece?
          </h1>
          <p className="flex leading-loose text-center lg:text-left text-[16px] md:text-[20px] xl:text-[24px] text-[#959CB1] mb-6">
            Connect with an architect through EliteBluPrint and transform your
            rough sketch into a polished blueprint.
          </p>
          <div className="flex justify-center">
            <Button sx={buttonStyles}>Explore Architect Consultation</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Download;