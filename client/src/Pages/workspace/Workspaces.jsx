import React from "react";
import { useState, useEffect } from "react";
import LeftChat from "../../components/workspace-panel/LeftChat.jsx";
import RightChat from "../../components/workspace-panel/RightChat.jsx";
import SendIcon from "@mui/icons-material/Send";

import { useSelector } from "react-redux";

import { ref, onValue, off } from "firebase/database";
import { getDownloadURL, ref as storageRef } from "firebase/storage";
import { database, storage } from "../../firebase";
import { useNavigate } from "react-router-dom";

import { motion } from "framer-motion";
import LoadingState from "../../components/loadingState/LoadingState";

const Workspaces = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [floorPlans, setFloorPlans] = useState([]);
  const [inputDesc, setInputDesc] = useState("");
  const [loadingState, setLoadingState] = useState(false);
  const [downloadOption, setDownloadOption] = useState("dxf"); // Default to DXF
  const [showLeftChat, setShowLeftChat] = useState(false); // State variable for left chat visibility

  useEffect(() => {
    if (currentUser) {
      fetchFloorPlans(currentUser.user._id);
    }
  }, [currentUser]);

  const fetchFloorPlans = async (userId) => {
    console.log("Fetching floor plans for user:", userId);

    try {
      setLoadingState(true);
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
                description: floorPlan.Description,
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
    } finally {
      setLoadingState(false);
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

  const handleGenerate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:5000/submit-textInput", {
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
        fetchFloorPlans(currentUser.user._id);
      } else {
        console.log(response);
        // Handle errors
        console.error("Failed to submit form data");
      }
    } catch (error) {
      console.error(error);
    }

    setInputDesc("");
  };

  const handleDownload = () => {
    if (floorPlansData) {
      console.log("Downloading floor plan:", floorPlansData);

      const selectedPath =
      downloadOption === "dxf"
        ? floorPlansData.floorPlanPathDxf
        : floorPlansData.floorPlanPathPng;

      getDownloadURL(ref(storage, selectedPath))
        .then((selectedPath) => {
          // This can be downloaded directly:
          const xhr = new XMLHttpRequest();
          xhr.responseType = "blob";
          xhr.onload = (event) => {
            const blob = xhr.response;
          };
          xhr.open("GET", selectedPath);
          xhr.send();

          // Or inserted into an <img> element
        //   const img = document.getElementById("myimg");
        //   img.setAttribute("src", selectedPath);

        })
        .catch((error) => {
          // Handle any errors
        });



      if (!selectedPath) {
        console.error("Selected path is undefined or null.");
        return;
      }

      // const url = selectedPath;
      // console.log("URL:", url);

      // // Create a link element
      // const link = document.createElement("a");
      // link.href = url;
      // link.download = `floor_plan.${downloadOption}`; // Use the selected download option as the file extension
      // link.target = "_blank";
      // link.rel = "noopener noreferrer";

      // // Append the link to the body and click it programmatically
      // document.body.appendChild(link);
      // link.click();

      // Remove the link from the body after the download
      // document.body.removeChild(link);
    } else {
      console.error("No floor plan data available for download.");
    }

    // Redirect to the download page if the user is an individual
    if (currentUser?.user?.role === "individual") {
      navigate("/download");
    }
  };

  // Toggle function for left chat visibility
  const toggleLeftChat = () => {
    setShowLeftChat(!showLeftChat);
  };

  return (
    <div className="m-10 mt-5 gap-1 md:gap-5 flex h-[80vh]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="bg-[#005BE2] flex-0 md:flex-[.25] rounded-xl overflow-y-scroll overflow-x-hidden  md:block hidden" // Hide on small screens
      >
        
        {floorPlans.map((floorPlan) => (
          <div className="flex flex-row ">
            <LeftChat
              key={`left-${floorPlan.id}`}
              userId={currentUser.user._id}
              click={() => handleOnClick(floorPlan.id)}
              floorPlanPath={floorPlan.floorPlanPathPng}
              description={floorPlan.description}
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


      {/* <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="bg-[#005BE2] flex-0 md:flex-[.25] rounded-xl overflow-y-scroll overflow-x-hidden block md:hidden " // Hide on large screens
      >
        
        {showLeftChat && (
          <div className="flex flex-row">
            {floorPlans.map((floorPlan) => (
              <LeftChat
                key={`left-${floorPlan.id}`}
                userId={currentUser.user._id}
                click={() => handleOnClick(floorPlan.id)}
                floorPlanPath={floorPlan.floorPlanPathPng}
                description={floorPlan.description}
              />
            ))}
          </div>
        )}

        <div
          className="bg-white hover:bg-slate-200 ease-out duration-150 mt-5 cursor-pointer w-auto px-2 md:py-3 mx-5 rounded-l-xl rounded-r-lg"
          onClick={() => handleOnClickNewChat("")}
        >
          <h5 className="text-[#5b5353] ease-out duration-150 text-1xl font-semibold text-center items-center flex justify-center">
            + <span className="hidden md:block">Add New Description</span>
          </h5>
        </div>
      </motion.div> */}

      {/* <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5, type: "tween" }}
          className="absolute top-0 left-0 bg-[#005BE2] flex-0 md:flex-[.25] rounded-xl overflow-y-scroll overflow-x-hidden  block md:hidden "
        >
          
          <div className="flex flex-col">
            {showLeftChat &&
              floorPlans.map((floorPlan) => (
                <LeftChat
                  key={`left-${floorPlan.id}`}
                  userId={currentUser.user._id}
                  click={() => handleOnClick(floorPlan.id)}
                  floorPlanPath={floorPlan.floorPlanPathPng}
                  description={floorPlan.description}
                />
              ))}
          </div>
          
          <div
            className="bg-white hover:bg-slate-200 ease-out duration-150 mt-5 cursor-pointer w-auto px-2 md:py-3 mx-5 rounded-l-xl rounded-r-lg"
            onClick={() => handleOnClickNewChat("")}
          >
            <h5 className="text-[#5b5353] ease-out duration-150 text-1xl font-semibold text-center items-center flex justify-center">
              + <span className="hidden md:block">Add New Description</span>
            </h5>
          </div>
        </motion.div> */}


      {loadingState ? (
        <div className="flex-1 bg-white flex-0 md:flex-[.75] rounded-l-lg rounded-r-3xl overflow-y-scroll px-4">
          <LoadingState planLoading={true} height="20vh" />
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="flex-1 bg-[#fff] md:flex-[.75] rounded-l-lg rounded-r-3xl overflow-y-scroll px-4 relative md:block hidden"
        >
          <div className="absolute right-[5px] mt-6 mr-3 flex items-center space-x-2 z-40">
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
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="flex-1 bg-[#fff] md:flex-[.75] rounded-l-md rounded-r-4xl overflow-y-scroll px-4 relative block md:hidden"
      >
        {/* Right Chat Section */}
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

        
        <div className="absolute top-0 left-0 bg-[#005BE2] flex-0 md:flex-[.25] rounded overflow-y-scroll overflow-x-hidden">
          
          <div className="flex flex-col">
            {showLeftChat &&
              floorPlans.map((floorPlan) => (
                <LeftChat
                  key={`left-${floorPlan.id}`}
                  userId={currentUser.user._id}
                  click={() => handleOnClick(floorPlan.id)}
                  floorPlanPath={floorPlan.floorPlanPathPng}
                  description={floorPlan.description}
                />
              ))}
          </div>
          
          <div
            className="bg-white hover:bg-slate-200 ease-out duration-150 mt-5 cursor-pointer w-auto px-2 md:py-3 mx-5 rounded-l-xl rounded-r-lg"
            onClick={() => handleOnClickNewChat("")}
          >
            <h5 className="text-[#5b5353] ease-out duration-150 text-2xl font-semibold text-center items-center flex justify-center">
              +
            </h5>
          </div>
        </div>

        <div className="absolute left-[170px] top-[10px] mr-3 flex items-center space-x-2 z-40">
          <label></label>
          <select
            className="px-4 mt-[100px] w-[85px] absolute bg-[#0065FF]/85 hover:bg-[#0065FF] duration-150 ease-out text-white text-[14px] p-3 rounded-lg outline-none"
            value={downloadOption}
            onChange={(e) => setDownloadOption(e.target.value)}
          >
            <option value="dxf">DXF</option>
            <option value="png">PNG</option>
          </select>
          <button
            className="px-4 bg-[#0065FF]/85 hover:bg-[#0065FF] duration-150 ease-out text-white text-[14px] p-3 rounded-lg"
            onClick={handleDownload}
          >
            Download
          </button>
        </div>
      </motion.div>

      <button className="absolute left-6 top-[100px]  bg-[#0065FF] hover:bg-[#0065FF] duration-150 ease-out text-white text-md font-semibold px-3 py-[5px] my-2 rounded-full md:hidden cursor-pointer"
      onClick={toggleLeftChat}> 
      +
      </button>
    </div>
  );
};

export default Workspaces;
