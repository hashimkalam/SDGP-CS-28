import React, { useEffect, useState } from "react";
import { Logo } from "../../components/Logo/logo";
import { FaUserCircle } from "react-icons/fa";
import "./workspace.css";
import { useSelector } from "react-redux";
import { ref, onValue } from "firebase/database";
import { getDownloadURL, ref as storageRef } from "firebase/storage";
import { database, app, storage } from "../../firebase"; // Assuming this is the path to your firebase configuration file

function Workspace() {
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

      const floorPlansSnapshot = await onValue(floorPlansRef, async (snapshot) => {

        const floorPlansData = snapshot.val();
        console.log("Fetched floor plans:", floorPlansData);
        const floorPlansList = [];

        for (const floorPlanId in floorPlansData) {
          const floorPlan = floorPlansData[floorPlanId];
          console.log("Fetching floor plan:", floorPlanId, floorPlan);
          try {
            const downloadURL = await getDownloadURL(storageRef(storage, floorPlan.floorPlanPath));
            console.log("Download URL:", downloadURL);
            floorPlansList.push({
              id: floorPlanId,
              floorPlanPath: downloadURL,
            });
          } catch (error) {
            console.error("Error fetching download URL:", error);
          }
        }

        setFloorPlans(floorPlansList);
        console.log("Floor plans:", floorPlansList);
      });

      return () => {
        off(floorPlansRef, "value", floorPlansSnapshot);
      }

    } catch (error) {
      console.error("Error fetching floor plans:", error);
    }
  };

  return (
    <div className="workspace-area">
      <div className="header-workspace">
        <Logo />
        <div className="profile-icon">
          {currentUser ? (
            <img
              src={currentUser?.user?.profilePicture}
              alt="profilePicture"
              className="h-9 w-9 rounded-full object-cover"
            />
          ) : (
            <FaUserCircle />
          )}
        </div>
      </div>
      <div className="workspace-container"> 
        {/* Render floor plans here using the 'floorPlans' state */}
        {floorPlans.map((floorPlan) => (
          <img key={floorPlan.id} src={floorPlan.floorPlanPath} alt={`Floor Plan ${floorPlan.id}`} />
        ))}
      </div>
    </div>
  );
}

export default Workspace;
