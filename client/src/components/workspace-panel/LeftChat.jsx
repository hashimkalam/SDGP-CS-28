import React from "react";

const LeftChat = ({ id, floorPlanDetails, click }) => {
  console.log("formData ", floorPlanDetails, click);
  return (
    <div
    className="bg-[rgb(255,255,255)] hover:bg-slate-500 delay-300 cursor-pointer w-full h-auto mt-5 align-middle mx-5 rounded-3xl"
    onClick={click}
    >
      <h5 className="text-black text-1xl font-bold text-center my-2 items-center flex justify-center">{floorPlanDetails.join("")}</h5>
    </div>
  );
};

export default LeftChat;
