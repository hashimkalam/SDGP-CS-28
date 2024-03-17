import React from "react";
import "./priceBox.css";

function PriceBox(prop) {
  return (
    <div className="PriceBox bg-[#090e34] text-center rounded-2xl mx-10 mt-5 w-fit p-5 px-7">
      <h1 className="price mt-10 font-bold text-2xl md:text-3xl lg:text-4xl">
        ${prop.price}
      </h1>
      <div className="feature flex flex-col space-y-6 h-[220px] my-10">
        <p>{prop.f1}</p>
        <p>{prop.f2}</p>
        <p>{prop.f3}</p>
      </div>
      <button className="bg-[#0b2b96] px-4 py-1.5 mb-2 font-bold rounded-md">
        Proceed
      </button>
    </div>
  );
}

export default PriceBox;
