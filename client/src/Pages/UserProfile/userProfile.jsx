import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { useNavigate , useLocation} from "react-router-dom";
import { signOut, updateUserDetails } from "../../redux/user/userSlice";

import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import { IconButton } from "@mui/material";
import {
  getAuth,
  deleteUser as deleteFirebaseUser,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import UserDelete from "../../components/model/UserDelete";

function userProfile() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const name = currentUser.user.name;
  const profile = currentUser.user.profilePicture;
  const email = currentUser.user.email;
  const password = currentUser.user.password;

  const [editMode, setEditMode] = useState(false);
  const [edittedName, setEdittedName] = useState(name);
  const [edittedPassword, setEdittedPassword] = useState(password);

  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const navigateToLogout = async () => {
    try {
      await fetch("http://localhost:3000/api/auth/signout");
      dispatch(signOut());
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  console.log(currentUser.user._id);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {}
    });

    return () => unsubscribe();
  }, []);

  const deleteUser = async () => {
    try {
      const auth = getAuth();
      const firebaseUser = auth.currentUser;
      if (!firebaseUser) {
        throw new Error("User not authenticated");
      }

      // Delete user from Firebase Authentication
      await deleteFirebaseUser(firebaseUser);

      // Delete user from MongoDB
      const res = await fetch("http://localhost:3000/api/auth/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: currentUser.user._id,
        }),
      });

      if (res.ok) {
        enqueueSnackbar("Account Deleted Successfully", { variant: "success" });
        navigateToLogout();
        navigate("/");
      } else {
        enqueueSnackbar("Failed to delete account", { variant: "error" });
      }
    } catch (error) {
      console.log("Error in deleting account: ", error);
      enqueueSnackbar("Error in deleting account. Please try again.", {
        variant: "error",
      });
    }
  };

  const updateDetails = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/auth/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          name: edittedName,
          password: edittedPassword,
        }),
      });

      if (res.ok) {
        dispatch(updateUserDetails({ name: edittedName }));

        enqueueSnackbar("Account details updated successfully", {
          variant: "success",
        });

        setEditMode(false);
      } else {
        enqueueSnackbar("Failed to update details", { variant: "error" });
      }
    } catch (error) {
      console.log("Error in updating details: ", error);
    }
  };

  console.log(editMode);
  return (
    <div className={`${
      location.pathname === "/userprofile"
      ?"displayFlex flex-col text-white pb-[10%]"
      :"displayFlex flex-col pb-[10%]"
    }`}
    >
      <h1>Account</h1>

      <div className="flex items-center justify-center flex-col mb-10">
        <img className="w-[80px] rounded-full m-[10px]" src={profile} alt="" />
        <h4>{name}</h4>
      </div>

      <div className="items-center justify-center flex-col flex gap-[30px]">
        <div className="bg-gray-500 w-[300px] md:w-[400px] lg:w-[500px] font-semibold border-[1px] border-gray-300 rounded-xl">
          <p className="py-[5px] px-[8px]">Account Datails</p>
          <div className="profileDetails">{email}</div>
          <div className="profileDetails">
            {editMode ? (
              <input
                type="text"
                value={edittedName}
                className="bg-[#121a56] outline-none p-1 w-full"
                onChange={(e) => {
                  console.log(e.target.value);
                  setEdittedName(e.target.value);
                }}
              />
            ) : (
              name
            )}

            {editMode ? (
              <IconButton
                className="pointer"
                onClick={() => setEditMode(!editMode)}
              >
                <DoneIcon className="text-white" />
              </IconButton>
            ) : (
              <IconButton
                className="pointer"
                onClick={() => setEditMode(!editMode)}
              >
                <EditIcon className="text-white" />
              </IconButton>
            )}
          </div>

          <div className="profileDetails">
            *******
            <IconButton
              className="pointer"
              onClick={() => setEditMode(!editMode)}
            >
              <EditIcon className="text-white" />
            </IconButton>
          </div>
          <div className="profileDetails p-[0px] text-center hover:text-white rounded-b-xl pointer">
            <button
              onClick={navigateToLogout}
              className="w-full p-2 rounded-bl-xl hover:bg-sky-700 duration-300 ease-in-out"
            >
              log out
            </button>
            <button
              onClick={updateDetails}
              className="w-full p-2 rounded-br-xl hover:bg-green-700 duration-300 ease-in-out"
            >
              save
            </button>
          </div>
        </div>
        <div className="bg-gray-500 w-[300px] md:w-[400px] lg:w-[500px]  font-semibold border-[1px] border-gray-300 rounded-xl">
          <p className="py-[5px] px-[8px]">Subscription</p>
          <div className="profileDetails rounded-b-xl">Premium (Annual)</div>
        </div>
        <div className="bg-gray-500 w-[300px] md:w-[400px] lg:w-[500px]  font-semibold border-[1px] border-gray-300 rounded-xl">
          <p className="py-[5px] px-[8px]">SETTINGS</p>
          <div className="profileDetails">
            To manage parental controls for profiles on your account, visit Edit
            Profiles and select a Profile.
          </div>
          <div className="profileDetails p-[0px] text-center text-red-500 rounded-b-xl hover:bg-red-700 hover:text-white duration-300 ease-in-out pointer">
            <UserDelete deleteUser={deleteUser} name="Delete Account" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default userProfile;
