import React from "react";
import { FaTrash } from "react-icons/fa";
import { database, storage } from "../../firebase";
import { getStorage, ref, deleteObject } from "firebase/storage";

const LeftChat = ({ id, floorPlanDetails, click, floorPlanPathPng }) => {
  console.log("formData ", floorPlanDetails, click, floorPlanPathPng);
  return (
    <div
      className="flex justify-between bg-[rgb(255,255,255)] hover:bg-slate-500 delay-300 cursor-pointer w-full h-auto mt-5 py-3 align-middle mx-5 pl-10 pr-5  rounded-3xl"
      onClick={click}
    >
      <h5 className="text-black text-1xl font-bold text-center items-center flex justify-center">
        {floorPlanDetails.join("")}
      </h5>

      <FaTrash
        onClick={() => {
          // Create a reference to the file to delete
          const desertRef = ref(storage, floorPlanPathPng);

          // Delete the file
          deleteObject(desertRef)
            .then(() => {
              console.log("File deleted successfully");
            })
            .catch((error) => {
              console.error("Error deleting file:", error);
            });
        }}
        className="delay-50 hover:scale-150 hover:text-red-900 text-black text-1xl font-bold text-center items-center flex justify-center"
      />
    </div>
  );
};

export default LeftChat;
