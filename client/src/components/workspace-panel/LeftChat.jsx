import React from "react";
import { FaTrash } from "react-icons/fa";

const LeftChat = ({ id, floorPlanDetails, click }) => {
  console.log("formData ", floorPlanDetails, click);
  return (
    <div
      className="flex justify-between bg-[rgb(255,255,255)] hover:bg-slate-500 delay-300 cursor-pointer w-full h-auto mt-5 py-3 align-middle mx-5 pl-10 pr-5  rounded-3xl"
      onClick={click}
    >
      <h5 className="text-black text-1xl font-bold text-center items-center flex justify-center">
        {floorPlanDetails.join("")}
      </h5>

      <FaTrash className="delay-50 hover:scale-150 hover:text-red-900 text-black text-1xl font-bold text-center items-center flex justify-center" />
    </div>
  );
};

export default LeftChat;
