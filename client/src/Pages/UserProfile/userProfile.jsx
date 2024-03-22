import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { useNavigate, useLocation } from "react-router-dom";
import { signOut } from "../../redux/user/userSlice";

import { onAuthStateChanged, getAuth,reauthenticateWithPopup, GoogleAuthProvider } from "firebase/auth";

import UserDelete from "../../components/model/UserDelete";

import { ref, remove } from "firebase/database";
import { database } from "../../firebase";
import LoadingState from "../../components/loadingState/LoadingState";
import EditUser from "../../components/model/EditUser";

import { motion } from "framer-motion";

function userProfile() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const name = currentUser?.user?.name;
  const profile = currentUser?.user?.profilePicture;
  const email = currentUser?.user?.email;
  const userID = currentUser?.user?._id;

  const [loadingState, setLoadingState] = useState(false);

  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  // logout
  const navigateToLogout = async () => {
    try {
      await fetch("https://sdgp-cs-28-backend-final-cp24t3kdkq-uc.a.run.app/api/auth/signout");
      dispatch(signOut());
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  console.log(email);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (async) => {});

    return () => unsubscribe(); // to prevent memory leaks
  }, []);

  const deleteUser = async () => {
    try {
      setLoadingState(true);

      // Firebase Authentication
      const auth = getAuth();
      const firebaseUser = auth.currentUser;

      // Delete associated data from Firebase Realtime Database (assuming 'userID' is defined)
      const floorPlansRef = ref(database, `users/${userID}/floorPlans`);
      await remove(floorPlansRef);

      // Delete user from Firebase Authenticationsnsnsni
      if (firebaseUser) {
        const user = getAuth().currentUser;
        const provider = new GoogleAuthProvider();

        await reauthenticateWithPopup(user, provider);
        await firebaseUser.delete();
      }

      // Custom user deletion logic for users not authenticated through Firebase
      const res = await fetch("https://sdgp-cs-28-backend-final-cp24t3kdkq-uc.a.run.app/api/auth/delete", {
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

  return (
    <div className="min-h-[89.2vh]">
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
          <motion.h1
            initial={{ opacity: 0, translateY: 5 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ duration: 0.35 }}
          >
            Account
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, translateY: 5 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ duration: 0.35, delay: 0.1 }}
            className="flex items-center justify-center flex-col mb-10"
          >
            <img
              className="w-[80px] rounded-full m-[10px]"
              src={profile}
              alt=""
            />
            <h4>{name}</h4>
          </motion.div>

          <div className="items-center justify-center flex-col flex gap-[30px]">
            <motion.div
              initial={{ opacity: 0, translateY: 5 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gray-500 w-[300px] md:w-[400px] lg:w-[500px] font-semibold border-[1px] border-gray-300 rounded-xl"
            >
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
                {name}
              </div>

              <div
                className={
                  location.pathname === "/userprofile"
                    ? "profileDetails"
                    : "bg-white profileDetails"
                }
              >
                ********
              </div>

              <div
                className={
                  location.pathname === "/userprofile"
                    ? "profileDetails p-[0px] text-center rounded-b-xl pointer"
                    : "bg-white profileDetails p-[0px] text-center rounded-b-xl pointer"
                }
              >
                <button
                  onClick={navigateToLogout}
                  className=" w-full p-2 rounded-bl-xl hover:text-white hover:bg-sky-700 duration-300 ease-in-out"
                >
                  log out
                </button>
                <EditUser />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, translateY: 5 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ duration: 0.35, delay: 0.3 }}
              className="bg-gray-500 w-[300px] md:w-[400px] lg:w-[500px]  font-semibold border-[1px] border-gray-300 rounded-xl"
            >
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
            </motion.div>
            <motion.div
              initial={{ opacity: 0, translateY: 5 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ duration: 0.35, delay: 0.5 }}
              className="bg-gray-500 w-[300px] md:w-[400px] lg:w-[500px]  font-semibold border-[1px] border-gray-300 rounded-xl"
            >
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
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
}

export default userProfile;
