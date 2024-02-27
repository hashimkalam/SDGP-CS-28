import React from "react";

const RightChat = ({ id, floorPlanPathPng }) => {
  return (
    <div className="w-[90%] h-full py-10">
      <img key={id} src={floorPlanPathPng} alt={`Floor Plan ${id}`} />
    </div>
  );
};

export default RightChat;
