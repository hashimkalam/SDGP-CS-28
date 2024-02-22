import React from "react";
import architectImage from "../../assets/signup_person.png";

const Architect = ({ architect }) => {
    const { name, description } = architect;
  return (
    <div className="flex flex-col justify-center items-center">
      <img
        className="h-95 w-80 bg-white border-white rounded-10" 
        src={architectImage}
        alt="Architect Image"
      />
      <h1 className="text-2xl font-bold">{name}</h1>
      <h5 className="text-xl">{description}</h5>
    </div>
  );
};

export default Architect;
