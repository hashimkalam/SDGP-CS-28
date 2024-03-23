import React from "react";
import glow from "../../assets/glow-mark.png";
import hero_bg from "../../assets/hero_bg.png";

import { motion } from "framer-motion";

function hero() {
  return (
    <div className="h-[90vh] bg-gradient-to-r from-[#002865] to-[#004ec3] text-white relative">
      <img src={hero_bg} className="absolute bottom-0 w-full" />
      <div className="text-center w-[75vw] mx-auto space-y-5">
        <motion.div
          initial={{ opacity: 0, translateY: 50 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ duration: 1 }}
          className="relative pt-20 w-fit mx-auto"
        >
          <img src={glow} className="absolute -left-10 top-10" />
          <h1 className="text-2xl md:text-4xl lg:text-5xl xl:text-[60px] font-bold"
          >
            Unleash Your Inner Architect
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, translateY: 50 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ duration: 1.2 }}
          className="font-normal uppercase leading-8 text-md md:text-lg lg:text-xl xl:text-2xl"
        >
          Build a space that reflects your unique style and needs, effortlessly
          with a description using elitebluprint
        </motion.p>
      </div>
    </div>
  );
}

export default hero;
