import React, { useState } from "react";
import PriceBox from "../priceBox/PriceBox.jsx";
import "./priceSection.css";

import { delay, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

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

  const { ref, inView } = useInView({ triggerOnce: true });

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

  return (
    <div className="PriceSection" id="pricing" ref={ref}>
      <div className="title">
        <motion.h1
          initial={{ opacity: 0, translateY: 10 }}
          animate={inView ? { opacity: 1, translateY: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          Simple And Affordable Pricing
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, translateY: 10 }}
          animate={inView ? { opacity: 1, translateY: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Skip the subscriptions, say goodbye to recurring fees. Build your
          forever home with one-time access to unlimited floor plan generation.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, translateY: 10 }}
          animate={inView ? { opacity: 1, translateY: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.35 }}
        >
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
        </motion.div>
      </div>
      <div></div>
      <div className="flex sm:flex-col items-center justify-center">
        <div className="flex flex-col md:flex-row">
          {priceList.map((data, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, translateY: 50 }}
              animate={inView ? { opacity: 1, translateY: 0 } : {}}
              transition={{ duration: 0.75, delay: index * 0.5 }}
            >
              <PriceBox
                price={data.price}
                f1={data.f1}
                f2={data.f2}
                f3={data.f3}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PriceSection;
