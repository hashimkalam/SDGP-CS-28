import React from "react";
import Stepcard from "../Stepcard/stepcard";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const steps = [
  {
    title: "Input text description",
    steps: "1",
    description:
      "Ditch the blueprints, grab your keyboard. EliteBluPrint turns your natural language vision into detailed floor plans. No jargon, no fuss, just pure imagination",
  },
  {
    title: "Generate plan",
    steps: "2",
    description:
      "From Wishful Thinking to Stunning Renderings: Watch your dream unfold as EliteBluPrint weaves your words into a visual masterpiece.",
  },
  {
    title: "Connect with architects",
    steps: "3",
    description:
      "Dont stop at the blueprints! Consult with seasoned professionals who refine your vision, ensure code compliance, and guide you from dream to reality.",
  },
];

const HowItWorks = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();
  const { ref, inView } = useInView({ triggerOnce: true });

  const handleButtonClick = () => {
    {
      currentUser ? navigate("/workspace") : navigate("/signup");
    }
  };

  return (
    <div
      ref={ref}
      className="bg-gradient-to-r from-[#002865] to-[#004ec3] text-white min-h-screen p-5 md:p-10 flex flex-col justify-between relative"
      id="how_it_works"
    >
      <div className="m-4 w-144 flex items-center justify-center mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1.5 }}
          className="font-inter font-bold text-2xl lg:text-3xl leading-relaxed text-center align-middle w-full"
        >
          Master the Magic: Your Guide to Generating Perfect Floor Plans
        </motion.p>
      </div>
      <div className="flex items-center justify-center max-xl:flex-wrap mt-10 mb-5">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, translateY: 50 }}
            animate={inView ? { opacity: 1, translateY: 0 } : {}}
            transition={{ duration: 0.75, delay: index * 0.5 }}
            className="mx-5"
          >
            <Stepcard
              title={step.title}
              steps={step.steps}
              description={step.description}
            />
          </motion.div>
        ))}
      </div>

      <motion.button
        initial={{ opacity: 0, translateY: 50 }}
        animate={inView ? { opacity: 1, translateY: 0 } : {}}
        transition={{ duration: 0.5, delay: 1.2 }}
        className="custom-button buttonHover cursor-pointer text-center rounded-lg bg-[#090e34]/75 ease-out duration-150 font-semibold py-3 w-[26vw] mx-auto text-sm md:text-md lg:text-lg"
        onClick={handleButtonClick}
      >
        Try It Out
      </motion.button>
    </div>
  );
};

export default HowItWorks;
