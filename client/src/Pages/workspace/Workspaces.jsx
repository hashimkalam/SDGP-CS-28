import React from "react";
import { useState, useEffect } from "react";
import LeftChat from "../../components/workspace-panel/LeftChat.jsx";
import RightChat from "../../components/workspace-panel/RightChat.jsx";
import Form from "../../components/form/form.jsx";

import { useSelector } from "react-redux";

import { ref, onValue } from "firebase/database";
import { getDownloadURL, ref as storageRef } from "firebase/storage";
import { database, storage } from "../../firebase";

const Workspaces = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [floorPlans, setFloorPlans] = useState([]);

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
          console.log("Fetched floor plans:", floorPlansData);
          const floorPlansList = [];

          for (const floorPlanId in floorPlansData) {
            const floorPlan = floorPlansData[floorPlanId];
            console.log("Fetching floor plan:", floorPlanId, floorPlan);
            try {
              const downloadURL = await getDownloadURL(
                storageRef(storage, floorPlan.floorPlanPath)
              );
              console.log("Download URL:", floorPlan.formData, downloadURL);
              floorPlansList.push({
                id: floorPlanId,
                floorPlanPath: downloadURL,
                formData: floorPlan.formData,
              });
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
  console.log("Floor plans dat:", floorPlansData);

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

  return (
    <div className="h-[vh] m-10 gap-10 flex">
      <div className="bg-[#005BE2] w-[25%] h-[32.5rem] rounded-3xl overflow-y-scroll overflow-x-hidden">
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
          className="bg-[rgb(255,255,255)] hover:bg-slate-500 delay-300 cursor-pointer w-auto h-[6.5%] align-middle mx-5 rounded-3xl"
          onClick={() => handleOnClickNewChat("")}
        >
          <h5 className="text-black text-1xl font-bold text-center mt-5 items-center flex justify-center">
            Add New Description
          </h5>
        </div>
      </div>
      <div className="bg-[#005BE2] w-[75%] h-[32.5rem] rounded-3xl overflow-y-scroll">
        <div className="flex flex-row mx-[10%]">
          {floorPlansData ?
           (
            <RightChat
              key={`right-${floorPlansData.id}`}
              floorPlanPath={floorPlansData.floorPlanPath}
            />
          ) : (
              <div className="input-field flex flex-row mx-[10%]">
                <Form />
              </div>
          )
        }
        </div>
      </div>
    </div>
  );
};

export default Workspaces;
