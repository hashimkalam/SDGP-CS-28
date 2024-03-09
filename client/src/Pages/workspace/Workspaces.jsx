import React from "react";
import { useState, useEffect } from "react";
import LeftChat from "../../components/workspace-panel/LeftChat.jsx";
import RightChat from "../../components/workspace-panel/RightChat.jsx";
import SendIcon from "@mui/icons-material/Send";

import { useSelector } from "react-redux";

import { ref, onValue } from "firebase/database";
import { getDownloadURL, ref as storageRef } from "firebase/storage";
import { database, storage } from "../../firebase";
import { useNavigate } from "react-router-dom";

import { motion } from "framer-motion";

const Workspaces = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [floorPlans, setFloorPlans] = useState([]);

  const [inputDesc, setInputDesc] = useState("");

  useEffect(() => {
    if (currentUser) {
      fetchFloorPlans(currentUser.user._id);
    }
  }, [currentUser]);

  const fetchFloorPlans = async (userId) => {
    console.log("Fetching floor plans for user:", userId);

    try {
      const floorPlansRef = ref(database, `users/${userId}/floorPlans`);

      const floorPlansSnapshot = await onValue(
        floorPlansRef,
        async (snapshot) => {
          const floorPlansData = snapshot.val();
          const floorPlansList = [];

          for (const floorPlanId in floorPlansData) {
            const floorPlan = floorPlansData[floorPlanId];
            console.log("Fetching floor plan:", floorPlanId, floorPlan);
            try {
              const downloadURLPng = await getDownloadURL(
                storageRef(storage, floorPlan.floorPlanPathPng)
              );
              console.log("Download URL:", downloadURLPng);
              const downloadURLDxf = await getDownloadURL(
                storageRef(storage, floorPlan.floorPlanPathDxf)
              );
              console.log("Download URL:", downloadURLDxf);
              floorPlansList.push({
                id: floorPlanId,
                floorPlanPathPng: downloadURLPng,
                floorPlanPathDxf: downloadURLDxf,
                formData: floorPlan.formData,
              });
              console.log(floorPlansList);
            } catch (error) {
              console.error("Error fetching download URL:", error);
            }
          }
          console.log("Fetched floor plans list:", floorPlansList);
          setFloorPlans(floorPlansList);
        }
      );

      return () => {
        off(floorPlansRef, "value", floorPlansSnapshot);
      };
    } catch (error) {
      console.error("Error fetching floor plans:", error);
    }
  };

  const [floorPlansData, setFloorPlansData] = useState(null);

  const handleOnClick = (id) => {
    console.log("id:", id);
    const selectedFloorPlan = floorPlans.find(
      (floorPlan) => floorPlan.id === id
    );
    console.log("selectedFloorPlan:", selectedFloorPlan);
    setFloorPlansData(selectedFloorPlan);
  };

  const handleOnClickNewChat = () => {
    setFloorPlansData(null);
  };

  console.log("floorPlansData:", floorPlans);

  const handleGenerate = (e) => {
    e.preventDefault();

    setInputDesc("");
  };

  const handleDownload = () => {
    if (floorPlansData) {
      const { floorPlanPathDxf } = floorPlansData; // downloading part of the file
      const downloadLink = document.createElement("a");
      downloadLink.href = floorPlanPathDxf;
      downloadLink.download = `floor_plan_${floorPlansData.id}.dxf`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);

      navigate("/download"); // re direct to this download page
    }
  };

  return (
    <div className="m-10 mt-5 gap-1 md:gap-5 flex h-[80vh]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="bg-[#005BE2] flex-0 md:flex-[.25] rounded-xl overflow-y-scroll overflow-x-hidden"
      >
        {floorPlans.map((floorPlan) => (
          <div className="flex flex-row">
            <LeftChat
              key={`left-${floorPlan.id}`}
              floorPlanDetails={floorPlan.formData}
              floorPlanPath={floorPlan}
              userId={currentUser.user._id}
              click={() => handleOnClick(floorPlan.id)}
              // floorPlanPath={floorPlan.floorPlanPathPng}
            />
          </div>
        ))}

        <div
          className="bg-white hover:bg-slate-200 ease-out duration-150 mt-5 cursor-pointer w-auto px-2 md:py-3 mx-5 rounded-l-xl rounded-r-lg"
          onClick={() => handleOnClickNewChat("")}
        >
          <h5 className="text-[#5b5353] ease-out duration-150 text-1xl font-semibold text-center items-center flex justify-center">
            + <span className="hidden md:block">Add New Description</span>
          </h5>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="flex-1 bg-[#fff] flex-0 md:flex-[.75] rounded-l-lg rounded-r-3xl overflow-y-scroll px-4"
      >
        <button
          className="absolute right-14 mt-4 mr-3 px-4 z-40 cursor-pointer bg-[#0065FF]/85 hover:bg-[#0065FF] duration-150 ease-out text-white p-3 rounded-lg"
          onClick={handleDownload}
        >
          Download
        </button>
        {floorPlansData ? (
          <RightChat
            key={`right-${floorPlansData.id}`}
            floorPlanPathPng={floorPlansData.floorPlanPathPng}
          />
        ) : (
          <div className="input-field flex flex-row relative h-[77.2vh] ">
            <form
              onSubmit={handleGenerate}
              className="absolute bottom-0 flex items-center justify-between w-full space-x-2"
            >
              <input
                type="text"
                className="rounded-full w-full p-2 px-4 outline-none bg-[#0047FF33] flex-1"
                value={inputDesc}
                onChange={(e) => setInputDesc(e.target.value)}
              />
              <div
                className="bg-[#0065FF] rounded-full text-sm flex flex-0 items-center md:p-2.5 px-2 pl-1 md:px-4 space-x-2 text-white cursor-pointer"
                onClick={handleGenerate}
              >
                <button type="submit" className="hidden md:block">
                  Generate
                </button>
                <SendIcon
                  className="text-white md:-ml-3 md:mr-4 m-2 md:m-0"
                  fontSize="small"
                />
              </div>
            </form>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Workspaces;
