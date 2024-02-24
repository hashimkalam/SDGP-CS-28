import React from "react";
import image from "../../assets/google_logo.jpg";

function userProfile() {
  return (
    <div className="flex items-center justify-between flex-col text-white">
      <h1>Account</h1>

      <div className="flex items-center justify-center flex-col">
        <img className="w-[80px] rounded-full m-[10px]" src={image} alt="" />
        <h4>NAME</h4>
      </div>

      <div className="items-center justify-center flex-col flex gap-[30px]">
        <div className="bg-gray-500 w-[300px] md:w-[400px] lg:w-[500px] font-semibold border-[1px] border-gray-300 rounded-xl">
          <p className="py-[5px] px-[8px]">Account Datails</p>
          <div className="bg-[#090e34] m-[1px] p-[10px] text-sm font-normal">
            mail.com
          </div>
          <div className="bg-[#090e34] m-[1px] p-[10px] text-sm font-normal">
            password
          </div>
          <div className="bg-[#090e34] m-[1px] p-[10px] text-sm font-normal text-center text-blue-500 rounded-b-xl">
            <button>log out</button>
          </div>
        </div>
        <div className="bg-gray-500 w-[300px] md:w-[400px] lg:w-[500px]  font-semibold border-[1px] border-gray-300 rounded-xl">
          <p className="py-[5px] px-[8px]">Subscription</p>
          <div className="bg-[#090e34] m-[1px] p-[10px] text-sm font-normal rounded-b-xl">
            Premium (Annual)
          </div>
        </div>
        <div className="bg-gray-500 w-[300px] md:w-[400px] lg:w-[500px]  font-semibold border-[1px] border-gray-300 rounded-xl">
          <p className="py-[5px] px-[8px]">SETTINGS</p>
          <div className="bg-[#090e34] m-[1px] p-[10px] text-sm font-normal">
            To manage parental controls for profiles on your account, visit Edit
            Profiles and select a Profile.
          </div>
          <div className="bg-[#090e34] m-[1px] p-[10px] text-sm font-normal text-center text-red-500 rounded-b-xl">
            <button>Delete Account</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default userProfile;