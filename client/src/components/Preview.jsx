import React, { useState } from "react";

const options = [
  {
    value:
      "build my dream house - it includes 2 bedrooms? each with an attached bathroom, add a living room and a kitchen too, build it",
  },
  {
    value:
      "Design me a floor plan with 3 bedrooms, a living room with 2 washrooms",
  },
  {
    value:
      "I want to generate the floor plan for my new house with 2 rooms a bathroom and a kitchen with living room",
  },
];

function Preview({ onTextSelect }) {
  const [selectedDesc, setSelectedDesc] = useState("");

  const handleSelect = (text) => {
    setSelectedDesc(text);
    onTextSelect(text);
  };

  return (
    <div className="w-[50vw] mx-auto space-y-5">
      <div className="bg-gradient-to-r from-[#003380] to-[#011635] text-white p-4 py-6 rounded-2xl space-y-4">
        <p className="text-xl font-semibold">
          <span className="bg-gradient-text">Welcome to EliteBluPrint</span>
        </p>
        <p>
          You can customize your dream space by choosing from the following room
          types: Bedroom, Washroom, Kitchen, Living Room,Dining Room
        </p>

        <p>
          Maximum Number of Rooms You Can Generate: For each room type, you can
          request up to 3 bedrooms, 3 washrooms. 1 living room, kitchen and
          dining room Please keep in mind this limit when prompting the floor
          plan ideas
        </p>
      </div>

      <h2>Try These Dream Configurations</h2>

      <div className="flex items-center justify-between max-xl:flex-wrap space-x-2">
        {options.map((option, index) => (
          <div
            key={index}
            onClick={() => handleSelect(option.value)}
            className="bg-[#999]/50 hover:bg-[#999]/75 w-[33%] min-h-[120px] duration-150 ease-in-out p-2 rounded-xl cursor-pointer"
          >
            <p className="text-sm text-justify">{option.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Preview;
