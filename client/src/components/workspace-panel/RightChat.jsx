import React from "react";

const RightChat = ({ id, floorPlanPathPng }) => {
  return (
    <div className="w-[90%] h-full py-10">
      <img 
        key={id} 
        src={floorPlanPathPng} 
        alt={`Floor Plan ${id}`} 
        className="h-[500px] w-[700px] object-contain rounded-3xl mx-auto"
      />
    </div>
  );
};

export default RightChat;
