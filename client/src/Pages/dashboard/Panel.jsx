import React, { useState } from 'react';
import UserProfile from "../UserProfile/userProfile";
import { useNavigate } from "react-router-dom";
import Dropbox from '../../components/dropbox/dropbox';

const Panel = () => {

  const [slide, setSlide] = useState("projects")
  const navigate = useNavigate();





  return (
    <main className="min-h-screen z-999 flex flex-col px-8 pt-7 pb-12 bg-gray-100 max-md:px-5 overflow-hidden">

      <header className="flex gap-5 justify-between w-full max-md:flex-wrap max-md:max-w-full">

        <div
          className="flex gap-3 justify-between text-2xl font-Inter-BoldItalic leading-6 cursor-pointer"
          onClick={() => navigate("/")}>

          <img
            loading="lazy"
            src="../../../images/Logo.png"
            alt="EliteBluPrint Logo"
          />

        </div>
        <button
          className="justify-center self-start px-8 py-4  font-Inter-Regular font-semibold leading-6 text-center text-white text-lg rounded-md bg-[#1d2144] max-md:px-5 focus:outline-none"
          onClick={() => navigate("/architectpanel")}
        >
          Generate Plan
        </button>

      </header>

      <section className="flex justify-center items-center px-16 py-5 mt-7 text-center text-white whitespace-nowrap rounded-xl bg-[#1d2144] max-md:px-5 max-md:max-w-full">
        <div className="flex gap-5 items-center justify-between  max-w-full w-[609px] max-md:flex-wrap">

          <div className="flex gap-5 justify-between cursor-pointer"
            onClick={() => setSlide("projects")}>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/93b67a72ff936c2da4adf3c65e955ea30a19b699d2a82d36236ff4e363593fed?apiKey=65e254045ad147e8ac09b67cc2360e6c&"
              className="aspect-square w-[35px]"
              alt="Projects Icon"
            />
            <div className="self-start mt-2 font-semibold font-Inter-Regular leading-6 text-xl">PROJECTS</div>
          </div>

          <div className="flex gap-5 justify-between cursor-pointer"
            onClick={() => setSlide("profile")}>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/3786e830ea825221a62baf7894d52dcb8d3e09be02c9221b73b57ac02c593c08?apiKey=65e254045ad147e8ac09b67cc2360e6c&"
              className="aspect-square w-[35px]"
              alt="Architect Icon"
            />
            <div className="self-start mt-3 font-semibold font-Inter-Regular leading-4 text-xl">My Profile</div>
          </div>
        </div>
      </section>

      {slide === "projects" ? (
        <section className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mt-10">
          <div className="flex items-center bg-white shadow rounded-lg h-[10rem] w-[20rem] xl:h-[200px] cursor-pointer transform transition-transform hover:scale-105 duration-500">
            <img src={""} alt='floor paln' />

          </div>
          <div class="flex items-center bg-white shadow rounded-lg h-[10rem] w-[20rem] xl:h-[200px] cursor-pointer transform transition-transform hover:scale-105 duration-500">
            <Dropbox/>
          </div>

        </section>
      ) : (
        <div>
          <UserProfile />
        </div>
      )}

    </main>
  )
}

export default Panel

