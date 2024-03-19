import { FaTrash } from "react-icons/fa";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

import { deleteObject, ref } from "firebase/storage";
import { storage, database } from "../../firebase";
import { ref as dbRef, remove } from "firebase/database";

const LeftChat = ({ userId, click, floorPlanPath, description, styles }) => {
  console.log(userId, "id");

  const deletePlan = () => {
    const desertRefPng = ref(storage, floorPlanPath.floorPlanPathPng);
    const desertRefDxf = ref(storage, floorPlanPath.floorPlanPathDxf);

    const deletePath = dbRef(
      database,
      `users/${userId}/floorPlans/${floorPlanPath.id}`
    );

    //Delete the file
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
      className={`flex justify-between items-center space-x-4 ${styles} text-white cursor-pointer hover:bg-[#090E34]/50 w-full h-auto mt-5 py-3 align-middle mx-5 rounded-lg px-2`}
      onClick={click}
    >
      <ChatBubbleOutlineIcon />
      <h5 className="text-1xl font-semibold flex-1 flex">
        {description.length > 22
          ? description.substring(0, 22) + "..."
          : description}
      </h5>

      <FaTrash
        onClick={deletePlan}
        className="delay-50 hover:scale-110 hover:text-red-900 text-1xl font-bold text-center items-center flex justify-center"
      />
    </div>
  );
};

export default LeftChat;
