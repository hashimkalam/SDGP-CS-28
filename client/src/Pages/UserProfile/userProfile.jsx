import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { useNavigate, useLocation } from "react-router-dom";
import { signOut, updateUserDetails } from "../../redux/user/userSlice";

import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import { IconButton } from "@mui/material";
import {
  getAuth,
  deleteUser as deleteFirebaseUser,
  onAuthStateChanged,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import UserDelete from "../../components/model/UserDelete";
// import EditUserDetails from "../../components/model/editUserDetails";

import { ref, remove } from "firebase/database";
import { database, storage } from "../../firebase";
import LoadingState from "../../components/loadingState/LoadingState";
import EditUser from "../../components/model/EditUser";

function userProfile() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const name = currentUser?.user?.name;
  const profile = currentUser?.user?.profilePicture;
  const email = currentUser?.user?.email;
  const password = currentUser?.user?.password;
  const userID = currentUser?.user?._id;

  const [nameEditMode, setNameEditMode] = useState(false);
  const [passEditMode, setPassEditMode] = useState(false);
  const [edittedName, setEdittedName] = useState(name);
  const [edittedPassword, setEdittedPassword] = useState(password);
  const [loadingState, setLoadingState] = useState(false);

  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  // logout
  const navigateToLogout = async () => {
    try {
      await fetch("http://localhost:3000/api/auth/signout");
      dispatch(signOut());
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  console.log(email);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
      }
    });

    return () => unsubscribe(); // to prevent memory leaks
  }, []);

  const deleteUser = async () => {
    try {
      // const reauthPassword = prompt("Re enter your password");
      setLoadingState(true);

      // removing the plans first
      const floorPlansRef = ref(database, `users/${userID}/floorPlans`);
      await remove(floorPlansRef);

      const auth = getAuth();
      const firebaseUser = auth?.currentUser;

      // Reauthenticate the user
      // const credentials = EmailAuthProvider.credential(email, reauthPassword);
      // await reauthenticateWithCredential(firebaseUser, credentials);

      // deleting user from firebase
      if (firebaseUser) await deleteFirebaseUser(firebaseUser);

      // finally deleting user from MongoDB
      const res = await fetch("http://localhost:3000/api/auth/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: userID,
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
    } finally {
      setLoadingState(false);
    }
  };

  // updatig details
  const updateUserName = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/auth/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          name: edittedName,
        }),
      });

      if (res.ok) {
        dispatch(updateUserDetails({ name: edittedName }));

        enqueueSnackbar("Account details updated successfully", {
          variant: "success",
        });

        setNameEditMode(false);
      } else {
        enqueueSnackbar("Failed to update details", { variant: "error" });
      }
    } catch (error) {
      console.log("Error in updating details: ", error);
    }
  };

  const updateUserPassword = async () => {
    try {
      const res = await fetch(
        "http://localhost:3000/api/password/resetpassword",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            newPassword: edittedPassword,
          }),
        }
      );

      if (res.ok) {
        dispatch(
          updateUserDetails({ password: edittedPassword, name: edittedName })
        );

        enqueueSnackbar("Account details updated successfully", {
          variant: "success",
        });

        setPassEditMode(false);
      } else {
        enqueueSnackbar("Failed to update details", { variant: "error" });
      }
    } catch (error) {
      console.log("Error in updating details: ", error);
    }
  };

  console.log(nameEditMode);

  return (
    <div>
      {loadingState ? (
        <LoadingState />
      ) : (
        <div
          className={`${
            location.pathname === "/userprofile"
              ? "displayFlex flex-col text-white pb-[10%]"
              : "displayFlex flex-col pb-[10%]"
          }`}
        >
          <h1>Account</h1>
          <div className="flex items-center justify-center flex-col mb-10">
            <img
              className="w-[80px] rounded-full m-[10px]"
              src={profile}
              alt=""
            />
            <h4>{name}</h4>
          </div>
          <div className="items-center justify-center flex-col flex gap-[30px]">
            <div className="bg-gray-500 w-[300px] md:w-[400px] lg:w-[500px] font-semibold border-[1px] border-gray-300 rounded-xl">
              <p className="py-[5px] px-[8px]">Account Datails</p>
              <div
                className={
                  location.pathname === "/userprofile"
                    ? "profileDetails"
                    : "bg-white profileDetails"
                }
              >
                {email}
              </div>
              <div
                className={
                  location.pathname === "/userprofile"
                    ? "profileDetails"
                    : "bg-white profileDetails"
                }
              >
                {nameEditMode ? (
                  <input
                    type="text"
                    value={edittedName}
                    className={
                      location.pathname === "/userprofile"
                        ? "bg-[#121a56] outline-none p-1 w-full"
                        : "bg-gray-500 outline-none p-1 w-full"
                    }
                    onChange={(e) => {
                      console.log(e.target.value);
                      setEdittedName(e.target.value);
                    }}
                  />
                ) : (
                  name
                )}

                {nameEditMode ? (
                  <IconButton
                    className="pointer"
                    onClick={() => setNameEditMode(!nameEditMode)}
                  >
                    <DoneIcon
                      className={
                        location.pathname === "/userprofile"
                          ? "text-white"
                          : "text-black"
                      }
                      onClick={updateUserName}
                    />
                  </IconButton>
                ) : (
                  <IconButton
                    className="pointer"
                    onClick={() => setNameEditMode(!nameEditMode)}
                  >
                    <EditIcon
                      className={
                        location.pathname === "/userprofile"
                          ? "text-white"
                          : "text-black"
                      }
                    />
                  </IconButton>
                )}
              </div>

              <div
                className={
                  location.pathname === "/userprofile"
                    ? "profileDetails"
                    : "bg-white profileDetails"
                }
              >
                {passEditMode ? (
                  <input
                    type="text"
                    className={
                      location.pathname === "/userprofile"
                        ? "bg-[#121a56] outline-none p-1 w-full"
                        : "bg-gray-500 outline-none p-1 w-full"
                    }
                    onChange={(e) => {
                      console.log(e.target.value);
                      setEdittedPassword(e.target.value);
                    }}
                  />
                ) : (
                  "********"
                )}
                {passEditMode ? (
                  <IconButton
                    className="pointer"
                    onClick={() => setPassEditMode(!passEditMode)}
                  >
                    <DoneIcon
                      className={
                        location.pathname === "/userprofile"
                          ? "text-white"
                          : "text-black"
                      }
                      onClick={updateUserPassword}
                    />
                  </IconButton>
                ) : (
                  <IconButton
                    className="pointer"
                    onClick={() => setPassEditMode(!passEditMode)}
                  >
                    <EditIcon
                      className={
                        location.pathname === "/userprofile"
                          ? "text-white"
                          : "text-black"
                      }
                    />
                  </IconButton>
                )}
              </div>

              <div
                className={
                  location.pathname === "/userprofile"
                    ? "profileDetails p-[0px] text-center hover:text-white rounded-b-xl pointer"
                    : "bg-white profileDetails p-[0px] text-center hover:text-white rounded-b-xl pointer"
                }
              >
                <button
                  onClick={navigateToLogout}
                  className=" w-full p-2 rounded-bl-xl hover:bg-sky-700 duration-300 ease-in-out"
                >
                  log out
                </button>
                <EditUser/>
              </div>
            </div>
            <div className="bg-gray-500 w-[300px] md:w-[400px] lg:w-[500px]  font-semibold border-[1px] border-gray-300 rounded-xl">
              <p className="py-[5px] px-[8px]">Subscription</p>
              <div
                className={
                  location.pathname === "/userprofile"
                    ? "profileDetails rounded-b-xl"
                    : "bg-white profileDetails rounded-b-xl"
                }
              >
                Premium (Annual)
              </div>
            </div>
            <div className="bg-gray-500 w-[300px] md:w-[400px] lg:w-[500px]  font-semibold border-[1px] border-gray-300 rounded-xl">
              <p className="py-[5px] px-[8px]">SETTINGS</p>
              <div
                className={
                  location.pathname === "/userprofile"
                    ? "profileDetails"
                    : "bg-white profileDetails"
                }
              >
                To manage parental controls for profiles on your account, visit
                Edit Profiles and select a Profile.
              </div>
              <div
                className={
                  location.pathname === "/userprofile"
                    ? "profileDetails p-[0px] text-center text-red-500 rounded-b-xl hover:bg-red-700 hover:text-white duration-300 ease-in-out pointer"
                    : "bg-white profileDetails p-[0px] text-center text-red-500 rounded-b-xl hover:bg-red-700 hover:text-white duration-300 ease-in-out pointer"
                }
              >
                <UserDelete deleteUser={deleteUser} name="Delete Account" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default userProfile;
