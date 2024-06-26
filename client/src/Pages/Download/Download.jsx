import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import tick_image from "../../assets/tick_svg.svg";
import person_image from "../../assets/download_person.png";

import { motion } from "framer-motion";

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

  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
      className="max-w-[1560px] mx-auto min-h-[88vh] -mt-5 overflow-hidden lg:overflow-auto flex flex-col lg:flex-row text-white p-10"
    >
      <div className="lg:flex-[.5] flex flex-col justify-center relative mt-0 lg:-mt-20">
        <motion.h1
          initial={{ opacity: 0, translateY: 50 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ duration: 0.75, delay: 0.1 }}
          className="text-center lg:text-left text-[40px] font-semibold"
        >
          Your Dream Home Awaits! Download Your Floor Plan Now.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, translateY: 50 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ duration: 0.75, delay: 0.3 }}
          className="text-center lg:text-left mx-auto lg:mx-0 text-[#959cb1] text-[18px] mb-12 mt-3 w-[80%]"
        >
          Celebrate your freshly minted masterpiece! Take the first step from
          dream to reality by downloading your personalized floor plan.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="space-y-5 mt-10 sm:ml-12 lg:ml-0 flex flex-col justify-center"
        >
          {options.map((option, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, translateX: 50 }}
              animate={{ opacity: 1, translateX: 0 }}
              transition={{ duration: 0.5, delay: index * 0.3 }}
              className="flex items-center w-full justify-center sm:justify-start space-x-3 sm:w-[25%] lg:w-[35%] mt-10 lg:mt-0"
            >
              <img
                src={tick_image}
                alt="Tick_Image"
                className="p-[12px] bg-gray-500/25"
                loading="lazy"
              />
              <p className="text-[#959CB1]">{option.text}</p>
            </motion.div>
          ))}

          <motion.img
            loading="lazy"
            initial={{ opacity: 0, translateY: 50 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ duration: 0.75, delay: 1 }}
            src={person_image}
            alt="Person_Image"
            className="absolute -bottom-46 lg:-bottom-10 right-24 lg:right-10 xl:right-20 w-[220px] lg:w-[235px] xl:w-[260px] hidden sm:block"
          />
        </motion.div>
      </div>

      <div className="mt-24 lg:-mt-12 lg:flex-[.5] displayFlex flex-col">
        <div className="space-y-5 pt-20 p-10 lg:p-10 w-full md:w-[70%] lg:w-[80%] xl:w-[70%]">
          <motion.div
            initial={{ opacity: 0, translateX: 50 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ duration: 0.75, delay: 0.5 }}
            className="flex space-x-5 h-[12vh]"
          >
            <div className="bg-[#4A6CF7]/10 hover:bg-[#4A6CF7]/20 hoverEffect" />
            <div className="bg-[#fff]/20 hover:bg-[#fff]/30 hoverEffect" />
            <div className="bg-[#0065FF]/20 hover:bg-[#0065FF]/30 hoverEffect" />
          </motion.div>
          <div className="grid grid-cols-3 space-x-3 h-[20vh] ">
            <motion.div
              initial={{ opacity: 0, translateX: 50 }}
              animate={{ opacity: 1, translateX: 0 }}
              transition={{ duration: 0.75, delay: 0.7 }}
              className="col-span-2 bg-[#fff]/10 hover:bg-[#fff]/20 mr-2 hoverEffect"
            />
            <motion.div
              initial={{ opacity: 0, translateX: 50 }}
              animate={{ opacity: 1, translateX: 0 }}
              transition={{ duration: 0.75, delay: 0.9 }}
              className="bg-[#fff]/20 hover:bg-[#fff]/30 hoverEffect"
            />
          </div>
        </div>

        <div className="w-[80%] mt-10">
          <motion.h1
            initial={{ opacity: 0, translateY: 50 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ duration: 0.75, delay: 1 }}
            className="text-center lg:text-left text-[25.6px] lg:text-[32px] italic font-semibold"
          >
            Ready to refine your masterpiece?
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, translateY: 50 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ duration: 0.75, delay: 1.1 }}
            className="flex leading-loose text-center lg:text-left text-[16px] md:text-[20px] xl:text-[24px] text-[#959CB1] mb-6 md:mb-0"
          >
            Connect with an architect through EliteBluPrint and transform your
            rough sketch into a polished blueprint.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, translateY: 50 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ duration: 0.75, delay: 1.2 }}
            className="flex justify-center"
          >
            <Button
              sx={buttonStyles}
              onClick={() => navigate("/architectpanel")}
            >
              Connect with an Architect Now
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default Download;
