import React, { useState } from 'react';

// const PlanCard = ({ title, onClick }) => (
//   <button
//     onClick={onClick}
//     className="flex flex-col w-3/12 max-md:ml-0 max-md:w-full cursor-pointer focus:outline-none"
//   >
//     <div className="flex flex-col grow text-base font-medium leading-6 text-black max-md:mt-10">
//       <div className="shrink-0 rounded-xl bg-zinc-300 h-[156px]" />
//       <div className="mt-2.5">{title}</div>
//     </div>
//   </button>
// );

const Panel = () => {
  return (
    <main className="min-h-screen z-999 flex flex-col px-8 pt-7 pb-12 bg-gray-100 max-md:px-5 overflow-hidden">

        <header className="flex gap-5 justify-between w-full max-md:flex-wrap max-md:max-w-full">

          <div className="flex gap-3 justify-between text-2xl font-Inter-BoldItalic leading-6">
           <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/c014a653809a0e66e3a9fe4740dc08365217dec7a1b1e47fc348521b07b8e272?apiKey=65e254045ad147e8ac09b67cc2360e6c&"
              className="aspect-[1.18] w-[68px]"
              alt="EliteBluPrint Logo"
            />
            <h1 className="grow self-start mt-4 font-Inter-BoldItalic text-[#1d2144] italic">EliteBluPrint</h1>
          </div>

          <button
            className="justify-center self-start px-8 py-4  font-Inter-Regular font-semibold leading-6 text-center text-white text-lg rounded-md bg-[#1d2144] max-md:px-5 focus:outline-none"
            onClick={() => console.log("Generate Plan clicked")}
          >
            Generate Plan
          </button>

        </header>

        <section className="flex justify-center items-center px-16 py-5 mt-7 text-center text-white whitespace-nowrap rounded-xl bg-[#1d2144] max-md:px-5 max-md:max-w-full">
            
          <div className="flex gap-5 items-center justify-between  max-w-full w-[609px] max-md:flex-wrap">

            <div className="flex gap-5 justify-between">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/3786e830ea825221a62baf7894d52dcb8d3e09be02c9221b73b57ac02c593c08?apiKey=65e254045ad147e8ac09b67cc2360e6c&"
                className="aspect-square w-[35px]"
                alt="Architect Icon"
              />
              <div className="self-start mt-3 font-semibold font-Inter-Regular leading-4 text-xl">ARCHITECT</div>
            </div>

            <div className="flex gap-5 justify-between">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/93b67a72ff936c2da4adf3c65e955ea30a19b699d2a82d36236ff4e363593fed?apiKey=65e254045ad147e8ac09b67cc2360e6c&"
                className="aspect-square w-[35px]"
                alt="Projects Icon"
              />
              <div className="self-start mt-2 font-semibold font-Inter-Regular leading-6 text-xl">PROJECTS</div>
            </div>

          </div>

        </section>

        <section className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mt-10">

            <div className="flex items-center p-8 bg-white shadow rounded-lg xl:h-[200px] cursor-pointer transform transition-transform hover:scale-105 duration-500">
                
                <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-[#1d2144] bg-blue-100 rounded-full mr-6">
                    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                </div>
                <div>
                    <span className="block text-2xl font-bold">Client 1</span>
                    <span className="block text-gray-500">Design a floor plan for a one-bedroom apartment...</span>
                </div>

            </div>

            <div className="flex items-center p-8 bg-white shadow rounded-lg xl:h-[200px] cursor-pointer transform transition-transform hover:scale-105 duration-500">

                <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-[#1d2144] bg-blue-100 rounded-full mr-6">
                    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                </div>
                <div>
                    <span className="block text-2xl font-bold">Client 2</span>
                    <span className="block text-gray-500">Design a floor plan for a one-bedroom apartment...</span>
                </div>

            </div>

            <div className="flex items-center p-8 bg-white shadow rounded-lg xl:h-[200px] cursor-pointer transform transition-transform hover:scale-105 duration-500">

                <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-[#1d2144] bg-blue-100 rounded-full mr-6">
                    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                </div>

                <div>
                    <span className="block text-2xl font-bold">Client 3</span>
                    <span className="block text-gray-500">Design a floor plan for a one-bedroom apartment...</span>
                </div>
            </div>
            
            <div className="flex items-center p-8 bg-white shadow rounded-lg xl:h-[200px] cursor-pointer transform transition-transform hover:scale-105 duration-500">

                <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-[#1d2144] bg-blue-100 rounded-full mr-6">
                    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                </div>
                <div>
                    <span className="block text-2xl font-bold">Client 4</span>
                    <span className="block text-gray-500">Design a floor plan for a one-bedroom apartment...</span>
                </div>

            </div>

            <div className="flex items-center p-8 bg-white shadow rounded-lg xl:h-[200px] cursor-pointer transform transition-transform hover:scale-105 duration-500">

                <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-[#1d2144] bg-blue-100 rounded-full mr-6">
                    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                </div>
                <div>
                    <span className="block text-2xl font-bold">Client 5</span>
                    <span className="block text-gray-500">Design a floor plan for a one-bedroom apartment...</span>
                </div>

            </div>

            <div className="flex items-center p-8 bg-white shadow rounded-lg xl:h-[200px] cursor-pointer transform transition-transform hover:scale-105 duration-500">

                <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-[#1d2144] bg-blue-100 rounded-full mr-6">
                    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                </div>
                <div>
                    <span className="block text-2xl font-bold">Client 6</span>
                    <span className="block text-gray-500">Design a floor plan for a one-bedroom apartment...</span>
                </div>
                
            </div>

            <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/54d90cb74fcdc573f5d48c5882b4afcaf19227eda9e3b6eedbf2a10f8f228e6e?apiKey=65e254045ad147e8ac09b67cc2360e6c&"
                alt="User profile image"
                className="self-stretch m-auto rounded-full aspect-square bg-zinc-300 w-[70px] max-md:mt-10 cursor-pointer transform transition-transform hover:scale-105 duration-500"/>

        </section>

      </main>
  )
}

export default Panel

