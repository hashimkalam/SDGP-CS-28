import React from "react";
import glow from "../../assets/glow-mark.png";
import hero_bg from "../../assets/hero_bg.png";

function hero() {
  return (
    <div className="h-[90.5vh] bg-gradient-to-r from-[#002865] to-[#004ec3] text-white relative">
      <img src={hero_bg} className="absolute bottom-0 w-full" />
      <div className="text-center w-[75vw] mx-auto space-y-5">
        <div className="relative pt-20 w-fit mx-auto">
          <img src={glow} className="absolute -left-10 top-16" />
          <h1 className="text-2xl md:text-4xl lg:text-5xl xl:text-[60px]">
            Unleash Your Inner Architect
          </h1>
        </div>

        <p className="font-normal uppercase leading-8 text-md md:text-lg lg:text-xl xl:text-2xl">
          Build a space that reflects your unique style and needs, effortlessly
          with a description using elitebluprint
        </p>
      </div>
    </div>
  );
}

export default hero;
