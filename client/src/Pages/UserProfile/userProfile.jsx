import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { signOut } from "../../redux/user/userSlice";

function userProfile() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const name = currentUser ? currentUser.user.name : "user";
  const profile = currentUser ? currentUser.user.profilePicture : "empty";

  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const navigateToLogout = async () => {
    try {
      await fetch("http://localhost:3000/api/auth/signout");
      dispatch(signOut());
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/auth/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: currentUser.user.email,
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
      console.log("Error deleting account: ", error);
    }
  };

  return (
    <div className="displayFlex flex-col text-white">
      <h1>Account</h1>

      <div className="flex items-center justify-center flex-col mb-10">
        <img className="w-[80px] rounded-full m-[10px]" src={profile} alt="" />
        <h4>{name}</h4>
      </div>

      <div className="items-center justify-center flex-col flex gap-[30px]">
        <div className="bg-gray-500 w-[300px] md:w-[400px] lg:w-[500px] font-semibold border-[1px] border-gray-300 rounded-xl">
          <p className="py-[5px] px-[8px]">Account Datails</p>
          <div className="profileDetails">{name}</div>
          <div className="profileDetails">password</div>
          <div className="profileDetails  p-[0px] text-center text-blue-500 hover:text-white hover:bg-sky-700 rounded-b-xl  duration-300 ease-in-out pointer">
            <button
              onClick={navigateToLogout}
              className="w-full p-2 rounded-b-xl"
            >
              log out
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
            <button onClick={deleteUser} className="w-full p-2 rounded-b-xl">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default userProfile;
