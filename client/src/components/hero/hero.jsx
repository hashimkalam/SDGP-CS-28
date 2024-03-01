import React from "react";
import "./hero.css";

function Hero() {
  return (

    <div className="h-screen flex flex-col bg-gradient-to-r from-[#002865] to-[#004EC3]  relative overflow-hidden">

      <div className="text-center mx-auto md:mt-[80px] mt-[70px] z-10">
        <h1 className="text-white font-Inter-BoldItalic lg:text-5xl text-[22px] font-bold italic">
          Unleash Your Inner Architect
        </h1>

        <p className="lg:mt-4 mt-2 font-Inter-Regular text-white lg:text-[18px] text-[10px]">
          BUILD A SPACE THAT REFLECTS YOUR UNIQUE STYLE AND NEEDS<br /> 
          EFFORTLESSLY WITH A DESCRIPTION USING ELITEBLUPRINT
        </p>
      </div>

      <div className="absolute block z-20 md:left-[390px] md:top-[75px] top-[70px] left-[15px]">
        <img className="md:h-70 md:w-45 h-[40px]" alt="Glow mark" src="images/glow-mark.svg" />
      </div>
      
      <div className="absolute block md:h-[610px] h-[580px] w-full max-w-full md:top-[100px] top-[100px]">
        <img className="h-full w-full object-fit" alt="Hero svg" src="images/img_herosvg.png"/>
      </div>

    </div>

  );
}

export default Hero;