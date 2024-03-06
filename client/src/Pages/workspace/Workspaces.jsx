import React from "react";
import { useState, useEffect } from "react";
import LeftChat from "../../components/workspace-panel/LeftChat.jsx";
import RightChat from "../../components/workspace-panel/RightChat.jsx";
import Form from "../../components/form/form.jsx";
import SendIcon from "@mui/icons-material/Send";

import { useSelector } from "react-redux";

import { ref, onValue } from "firebase/database";
import { getDownloadURL, ref as storageRef } from "firebase/storage";
import { database, storage } from "../../firebase";

const Workspaces = () => {
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
      const { floorPlanPathDxf } = floorPlansData;
      const downloadLink = document.createElement("a");
      downloadLink.href = floorPlanPathDxf;
      downloadLink.download = `floor_plan_${floorPlansData.id}.dxf`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  return (
    <div className="m-10 gap-5 flex h-[80vh]">
      <div className="bg-[#005BE2] w-[25%] rounded-3xl overflow-y-scroll overflow-x-hidden">
        {floorPlans.map((floorPlan) => (
          <div className="flex flex-row">
            <LeftChat
              key={`left-${floorPlan.id}`}
              floorPlanDetails={floorPlan.formData}
              click={() => handleOnClick(floorPlan.id)}
            />
          </div>
        ))}

        <div
          className="bg-white hover:bg-slate-200 ease-out duration-150 mt-5 cursor-pointer w-auto py-3 mx-5 rounded-3xl"
          onClick={() => handleOnClickNewChat("")}
        >
          <h5 className="text-[#767171] hover:text-black ease-out duration-150 text-1xl font-semibold text-center items-center flex justify-center">
            +Add New Description
          </h5>
        </div>
      </div>
      <div className="bg-[#fff] w-[75%] rounded-3xl overflow-y-scroll">

        <button className="absolute right-14 mt-4 mr-3 py-3 px-4 bg-[#0065FF]/85 font-Inter-Regular hover:bg-[#0065FF] duration-150 ease-out text-white p-3 rounded-lg"
            onClick={handleDownload}>
         Download
        </button>

        <div className="flex flex-row mx-4">
          {floorPlansData ? (
            <RightChat
              key={`right-${floorPlansData.id}`}
              floorPlanPathPng={floorPlansData.floorPlanPathPng}
            />
          ) : (
            <div className="input-field flex flex-row mx-[10%] relative h-[77.75vh] ">
              <form
                onSubmit={handleGenerate}
                className="absolute bottom-0 w-full flex items-center"
              >
                <input
                  type="text"
                  className="rounded-full w-full p-2 px-4 outline-none"
                  value={inputDesc}
                  onChange={(e) => setInputDesc(e.target.value)}
                />
                <div
                  className="bg-[#0065FF] rounded-full text-sm flex items-center"
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
        </div>
      </div>
    </div>
  );
};

export default Workspaces;
