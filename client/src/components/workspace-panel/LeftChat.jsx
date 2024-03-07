import React from "react";
import { FaTrash } from "react-icons/fa";

import { ref } from "firebase/storage";
import { storage, database } from "../../firebase";
import { ref as dbRef, remove } from "firebase/database";

const LeftChat = ({ userId, floorPlanDetails, click, floorPlanPath }) => {
  console.log("formData ", floorPlanDetails, click);
  console.log(userId, "id");

  const deletePlan = () => {
    const desertRefPng = ref(storage, floorPlanPath.floorPlanPathPng);
    const desertRefDxf = ref(storage, floorPlanPath.floorPlanPathDxf);

    const deletePath = dbRef(
      database,
      `users/${userId}/floorPlans/${floorPlanPath.id}`
    );

    console.log("desertRefPng", desertRefPng);
    console.log("desertRefDxf", desertRefDxf);
    console.log("deletePath", deletePath);

    // Delete the file
    deleteObject(desertRefPng)
      .then(() => {
        console.log("png File deleted successfully");
      })
      .catch((error) => {
        console.log("Error deleting file", error);
      });

    deleteObject(desertRefDxf)
      .then(() => {
        console.log("Dxf File deleted successfully");
      })
      .catch((error) => {
        console.log("Error deleting file", error);
      });

    remove(deletePath)
      .then(() => {
        console.log("dabase File deleted successfully");
      })
      .catch((error) => {
        console.log("Error deleting file", error);
      });
  };

  return (
    <div
      className="flex justify-between bg-[rgb(255,255,255)] hover:bg-slate-500 delay-300 cursor-pointer w-full h-auto mt-5 py-3 align-middle mx-5 pl-10 pr-5  rounded-3xl"
      onClick={click}
    >
      <h5 className="text-black text-1xl font-bold text-center items-center flex justify-center">
        {floorPlanDetails.join("")}
      </h5>

      <FaTrash
        onClick={deletePlan}
        className="delay-50 hover:scale-150 hover:text-red-900 text-black text-1xl font-bold text-center items-center flex justify-center"
      />
    </div>
  );
};

export default LeftChat;
