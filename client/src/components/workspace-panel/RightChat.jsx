import React from "react";

const RightChat = ({ id, floorPlanPath }) => {
  return (
    <div className="w-[90%] h-full py-10">
      <img key={id} src={floorPlanPath} alt={`Floor Plan ${id}`} />
    </div>
  );
};

export default RightChat;
