import React, { useState } from "react";
import PriceBox from "../priceBox/PriceBox.jsx";
import "./priceSection.css";

function PriceSection() {
  const [priceList, setPriceList] = useState([
    {
      price: 20,
      f1: "Unlimited floor plan generation.",
      f2: "Downloadable files in DXF format",
    },
    {
      price: 50,
      f1: "Unlimited floor plan generation.",
      f2: "Downloadable files in DXF format",
      f3: "Architect consultation",
    },
  ]);

  const handleOnChange = (event) => {
    if (event.target.checked) {
      setPriceList((prevList) => [
        { ...prevList[0], price: 299 },
        { ...prevList[1], price: 599, f3: "Unlimited Clients" },
      ]);
    } else {
      setPriceList((prevList) => [
        { ...prevList[0], price: 20 },
        { ...prevList[1], price: 50, f3: "Architect consultation" },
      ]);
    }
  };

<<<<<<< HEAD
    return (
        <>
            <div className='PriceSection' id='pricing-section'>
                <div className='title'>
                    <h1>Simple And Affordable Pricing</h1>
                    <p>Skip the subscriptions, say goodbye to recurring fees. Build your forever home with one-time access to unlimited floor plan generation.</p>
                    <div>
                        Indivdual
                        <label className="switch" htmlFor="lifetimeCheckbox">
                            <input
                                type="checkbox"
                                id="lifetimeCheckbox"
                                onChange={handleOnChange}
                            />
                            <span class="slider round"></span>
                        </label>
                        Architect
                    </div>
                </div>
                <div className='priceBox'>
                    {priceList.map((data, index) => (
                        <PriceBox
                            key={index}
                            price={data.price}
                            f1={data.f1}
                            f2={data.f2}
                            f3={data.f3}
                        />
                    ))}
                </div>
            </div>


        </>
    );
=======
  return (
    <div className="PriceSection" id="pricing">
      <div className="title">
        <h1>Simple And Affordable Pricing</h1>
        <p>
          Skip the subscriptions, say goodbye to recurring fees. Build your
          forever home with one-time access to unlimited floor plan generation.
        </p>
        <div>
          Indivdual
          <label className="switch" htmlFor="lifetimeCheckbox">
            <input
              type="checkbox"
              id="lifetimeCheckbox"
              onChange={handleOnChange}
            />
            <span class="slider round"></span>
          </label>
          Architect
        </div>
      </div>
      <div className="priceBox">
        {priceList.map((data, index) => (
          <PriceBox
            key={index}
            price={data.price}
            f1={data.f1}
            f2={data.f2}
            f3={data.f3}
          />
        ))}
      </div>
    </div>
  );
>>>>>>> loshan
}

export default PriceSection;
