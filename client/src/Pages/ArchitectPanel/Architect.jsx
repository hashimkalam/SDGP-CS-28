import React from "react";
import architectImage from "../../assets/signup_person.png";

const Architect = ({ architect }) => {
  const { name, description } = architect;
  return (
    <div className="flex flex-col bg-white shadow-lg rounded-lg overflow-hidden w-[80%] mx-auto m-4">
      <img
        className="h-96 object-cover mx-auto p-4"
        src={architectImage}
        alt="Architect Image"
        loading="lazy"
      />
      <div className="p-4 bg-[#005BE2]">
        <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-white mt-4">
          {name}
        </h1>
        <h5 className="text-xs sm:text-sm md:text-base text-white mt-2">
          {description}
        </h5>
      </div>
    </div>
  );
};

export default Architect;
