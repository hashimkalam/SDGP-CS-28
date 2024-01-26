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
    background: "#0065FF",
    color: "#fff",
    padding: "13px",
  };

  return (
    <div className="max-w-[1560px] mx-auto pt-44 min-h-screen overflow-hidden lg:overflow-auto  flex flex-col lg:flex-row text-white p-10">
      <div className="lg:flex-[.5]">
        <div className="h-[40%]">
          <h1 className="text-[40px] font-semibold">
            Your Dream Home Awaits! Download Your Floor Plan Now.
          </h1>
          <p className="text-[#959cb1] text-[18px] mb-12 mt-5 w-[80%]">
            Celebrate your freshly minted masterpiece! Take the first step from
            dream to reality by downloading your personalized floor plan.
          </p>

          <Button style={buttonStyles}> Download Now </Button>
        </div>
        <div className="space-y-5 h-[40%] relative flex flex-col justify-center">
          {options.map((option, index) => (
            <div className="flex items-center space-x-3 w-[40%]">
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
            className="absolute bottom-4 right-0"
          />
        </div>
      </div>

      <div className="mt-24 lg:-mt-12 lg:flex-[.5]">
        <div className="space-y-6 p-20 lg:p-10">
          <div className="flex space-x-6  h-[12vh]">
            <div className="bg-[#4A6CF7]/10 hover:bg-[#4A6CF7]/20 hoverEffect" />
            <div className="bg-[#fff]/20 hover:bg-[#fff]/30 hoverEffect" />
            <div className="bg-[#0065FF]/20 hover:bg-[#0065FF]/30 hoverEffect" />
          </div>
          <div className="grid grid-cols-3 space-x-4  h-[20vh] ">
            <div className="col-span-2 bg-[#fff]/10 hover:bg-[#] mr-2 hoverEffect" />
            <div className="bg-[#fff]/20 hoverEffect" />
          </div>
        </div>

        <div>
          <h1 className="text-[32px] italic">
            Ready to refine your masterpiece?
          </h1>
          <p className="text-[30px] text-[#959CB1] mb-6">
            Connect with an architect through EliteBluPrint and transform your
            rough sketch into a polished blueprint.
          </p>
          <Button style={buttonStyles}>Explore Architect Consultation</Button>
        </div>
      </div>
    </div>
  );
}

export default Download;
