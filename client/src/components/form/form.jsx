import { useState } from "react";
import { useSelector } from "react-redux";

const options = [
  {
    value: "Bathroom",
  },
  {
    value: "Living Room",
  },
  {
    value: "Kitchen",
  },
  {
    value: "Bedroom",
  },
  {
    value: "Dining Room",
  },
  {
    value: "Common Room",
  },
];

function Form() {
  const [roomValues, setRoomValues] = useState(Array(options.length).fill(""));
  const { currentUser } = useSelector((state) => state.user);

  const handleInputChange = (index, value) => {
    const newRoomValues = [...roomValues];
    newRoomValues[index] = value;
    setRoomValues(newRoomValues);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:5000/submit-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          roomValues,
          "USER_ID": currentUser.user._id
        }),
      });
  
      if (response.ok) {
        // Form data submitted successfully
        const result = await response.json();
        console.log(result.message);
        fetchFloorPlans(currentUser.user._id)
      } else {
        console.log(response);
        // Handle errors
        console.error('Failed to submit form data');
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <div className="flex justify-center items-center h-screen">
      <form className="bg-white/75 w-[80%] mx-auto h-[80%] flex flex-col justify-center items-center">
        {options.map((option, index) => (
          <div className="space-x-5" key={index}>
            <label>{option.value}</label>
            <input
              type="text"
              placeholder="Input field"
              className="mb-4 p-2 bg-white/50 hover:bg-white/75 focus:bg-white outline-none border border-gray-300 rounded-md"
              value={roomValues[index]}
              onChange={(e) => handleInputChange(index, e.target.value)}
            />
          </div>
        ))}
    
        <button
          onClick={(e) => {
            handleSubmit(e);
          }}
        >
          Generate
        </button>
      </form>
    </div>
  );
}

export default Form;