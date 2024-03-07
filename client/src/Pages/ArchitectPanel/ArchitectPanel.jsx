import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/navbar";
import Architect from "./Architect";

const ArchitectPanel = () => {
  const [architects, setArchitects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArchitects = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/user/architectpanel"
        );
        const data = await response.json();
        console.log(data);
        setArchitects(data.architects);
        console.log(architects);
      } catch (error) {
        console.error(error.message);
        setError("Error fetching architects");
      } finally {
        setLoading(false);
      }
    };

    fetchArchitects();
  }, []); // Empty dependency array means this effect will only run once, similar to componentDidMount

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="h-full bg-custom-blue">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-center text-white">
          Our Panel of Architects
        </h1>
        <h5 className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl text-center text-white">
          Choose an architect to meet and discuss your project with them in detail
        </h5>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 m-10">
        {architects.map((architect, index) => (
          <Architect key={index} architect={architect} />
        ))}
      </div>

      <div className="flex justify-center">
        <button className="bg-gradient-to-r from-[#667EEA] to-[#5E5ABA] hover:from-[#5E5ABA] hover:to-[#667EEA] text-white p-4 rounded-md m-10">
          Book an appointment to meet an architect
        </button>
      </div>
    </div>
  );
};

export default ArchitectPanel;
