import { useState } from "react";
import image from "../../public/images/code1.png";

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
    <div className="w-[60vw] mx-auto space-y-5 h-[65vh] flex flex-col justify-center">
      <p className="text-xl font-semibold">
        <span className="bg-gradient-text text-5xl">
          Welcome to EliteBluPrint!
        </span>
      </p>
      <div className="text-[#004EC3] px-4 py-3 hidden lg:block rounded-2xl space-y-4 border-2 border-black">
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
      <h2 className="hidden">Try These Dream Configurations</h2>
      <h2 className="lg:hidden">How can I help you today?</h2>
      <div className="lg:flex items-center justify-between hidden max-xl:flex-wrap space-x-6">
        {options.map((option, index) => (
          <div
            key={index}
            onClick={() => handleSelect(option.value)}
            className="workspace_shadow hover:bg-[#0065FF]/75 hover:text-white lg:w-[30%] relative min-h-[150px] duration-150 ease-in-out p-3 rounded-xl cursor-pointer"
          >
            <p className="text-sm text-justify">{option.value}</p>

            <img
              src={image}
              alt="code image"
              className="absolute bottom-2 right-2"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Preview;
