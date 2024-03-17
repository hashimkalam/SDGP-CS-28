import React, { useState } from "react";
import { useEffect } from "react";
import LeftChat from "../../components/workspace-panel/LeftChat.jsx";
import RightChat from "../../components/workspace-panel/RightChat.jsx";
import SendIcon from "@mui/icons-material/Send";
import { useSelector } from "react-redux";

import { ref, onValue, set } from "firebase/database";
import { getDownloadURL, ref as storageRef } from "firebase/storage";
import { database, storage } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import LoadingState from "../../components/loadingState/LoadingState";
import Preview from "../../components/Preview.jsx";

const Workspaces = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [floorPlans, setFloorPlans] = useState([]);
  const [inputDesc, setInputDesc] = useState("");
  const [loadingState, setLoadingState] = useState(false);
  const [downloadOption, setDownloadOption] = useState("dxf"); // Default to DXF
  const [initialRender, setInitialRender] = useState(true);

  useEffect(() => {
    if (currentUser) {
      fetchFloorPlans(currentUser.user._id);
    }
  }, [currentUser]);

  useEffect(() => {
    // Check if the currently selected floor plan is still in the floorPlans array
    const selectedFloorPlanExists = floorPlans.some(
      (floorPlan) => floorPlan.id === floorPlansData?.id
    );

    // If the selected floor plan does not exist, set floorPlansData to null
    if (!selectedFloorPlanExists) {
      setFloorPlansData(null);
    }
  }, [floorPlans]);

  const fetchFloorPlans = async (userId) => {
    console.log("Fetching floor plans for user:", userId);

    try {
      
      const floorPlansRef = ref(database, `users/${userId}/floorPlans`);

      const floorPlansSnapshot = await onValue(
        floorPlansRef,
        async (snapshot) => {
          const floorPlansData = snapshot.val();
          var floorPlansList = [];
          

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
                description: floorPlan.Description,
                timeStamp: floorPlan.timestamp,
              });
              console.log(floorPlansList);
            } catch (error) {
              console.error("Error fetching download URL:", error);
            }
          }

          floorPlansList.sort((a, b) => new Date(b.timeStamp) - new Date(a.timeStamp));
          console.log("Fetched floor plans list:", floorPlansList);
          if (initialRender){
            setInitialRender(false);
          }else {setFloorPlansData(floorPlansList[0]);
            setLoadingState(false);
          
          }

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

  const handleGenerate = async (e) => {
    e.preventDefault();

    console.log("working");
    try {
      setLoadingState(true);
      const response = await fetch("http://localhost:5000/submit-textInput", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          USER_ID: currentUser.user._id,
          inputData: inputDesc,
        }),
      });

      if (response.ok) {
        // Form data submitted successfully
        const result = await response.json();
        console.log(result.message);
        fetchFloorPlans(currentUser.user._id
        );
      } else {
        
        console.log(response);
        // Handle errors
        console.error("Failed to submit form data");
        setLoadingState(false);
      }
    } catch (error) {
      console.error(error);
      setLoadingState(false);
    }

    setInputDesc("");
  };

  const handleDownload = async () => {
    if (floorPlansData) {
      console.log("Downloading floor plan:", floorPlansData);

      const selectedPath =
        downloadOption === "dxf"
          ? floorPlansData.floorPlanPathDxf
          : floorPlansData.floorPlanPathPng;

      if (!selectedPath) {
        console.error("Selected path is undefined or null.");
        return;
      }

      try {
        // Get the download URL for the selectedPath
        const downloadURL = await getDownloadURL(
          storageRef(storage, selectedPath)
        );

        // Create a temporary anchor element
        const downloadLink = document.createElement("a");
        downloadLink.href = downloadURL;
        downloadLink.download = `floor_plan.${downloadOption}`; // Set a default file name and extension

        // Append the anchor element to the document body
        document.body.appendChild(downloadLink);

        // Trigger a click event on the anchor element
        downloadLink.click();

        // Remove the anchor element from the document body
        document.body.removeChild(downloadLink);
      } catch (error) {
        console.error("Error fetching download URL:", error);
      }
    } else {
      console.error("No floor plan data available for download.");
    }

    // Redirect to the download page if the user is an individual
    if (currentUser?.user?.role === "individual") {
      navigate("/download");
    }
  };

  const handleTextSelect = (text) => {
    setInputDesc(text);
  };

  return (
    <div className="m-10 mt-5 gap-1 md:gap-5 flex h-[80vh]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="bg-[#005BE2] flex-0 md:flex-[.25] rounded-xl overflow-y-scroll overflow-x-hidden"
      >
        <div
          className="bg-white hover:bg-slate-200 ease-out duration-150 mt-5 cursor-pointer w-auto px-2 md:py-3 mx-5 rounded-l-xl rounded-r-lg"
          onClick={() => handleOnClickNewChat("")}
        >
          <h5 className="text-[#5b5353] ease-out duration-150 text-1xl font-semibold text-center items-center flex justify-center">
            + <span className="hidden md:block">Add New Description</span>
          </h5>
        </div>
        {floorPlans.map((floorPlan,index) => (
          <div className="flex flex-row">
            <LeftChat
              key={`left-${index}`}
              userId={currentUser.user._id}
              click={() => handleOnClick(floorPlan.id)}
              floorPlanPath={floorPlan}
              description={floorPlan.description}
            />
          </div>
        ))}

      </motion.div>
      {loadingState ? (
        <div className="flex-1 bg-white flex-0 md:flex-[.75] rounded-l-lg rounded-r-3xl overflow-y-scroll px-4">
          <LoadingState planLoading={true} height="20vh" />
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="flex-1 bg-[#fff] md:flex-[.75] rounded-l-lg rounded-r-3xl overflow-y-scroll px-4"
        >
          <div className="absolute right-14 mt-4 mr-3 flex items-center space-x-2 z-40">
            <label></label>
            <select
              className="px-4 mt-[110px] w-[113px] absolute bg-[#0065FF]/85 hover:bg-[#0065FF] duration-150 ease-out text-white p-3 rounded-lg outline-none"
              value={downloadOption}
              onChange={(e) => setDownloadOption(e.target.value)}
            >
              <option value="dxf">DXF</option>
              <option value="png">PNG</option>
            </select>
            <button
              className="px-4 bg-[#0065FF]/85 hover:bg-[#0065FF] duration-150 ease-out text-white p-3 rounded-lg"
              onClick={handleDownload}
            >
              Download
            </button>
          </div>
          {floorPlansData ? (
            <RightChat
              key={`right-${floorPlansData.id}`}
              floorPlanPathPng={floorPlansData.floorPlanPathPng}
            />
          ) : (
            <div className="input-field flex flex-row relative h-[77.2vh]">
              <form
                onSubmit={handleGenerate}
                className="absolute bottom-0 flex items-center justify-between w-full space-x-2"
              >
                <div className="mt-10 z-50 w-[68vw]">
                  {location.pathname == "/workspace" && (
                    <Preview onTextSelect={handleTextSelect} />
                  )}
                  <div className="flex mt-10">
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
                  </div>
                </div>
              </form>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default Workspaces;
