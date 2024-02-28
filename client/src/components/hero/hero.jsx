import React from "react";
import glow from "../../assets/glow-mark.png";
import hero_bg from "../../assets/hero_bg.png";

function hero() {
  return (
    <div className="h-[90.5vh] bg-gradient-to-r from-[#002865] to-[#004ec3] text-white relative">
      <img src={hero_bg} className="absolute bottom-0 w-full" />
      <div className="text-center w-[75vw] mx-auto space-y-5">
        <div className="relative pt-36">
          <img src={glow} className="absolute -left-8 top-28" />
          <h1 className="text-5xl">Unleash Your Inner Architect</h1>
        </div>

        <p className="font-thin uppercase leading-8 text-lg">
          Build a space that reflects your unique style and needs, effortlessly
          with a description using elitebluprint
        </p>
      </div>
    </div>
  );
}

export default hero;
