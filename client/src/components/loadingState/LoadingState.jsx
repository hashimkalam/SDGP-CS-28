import { useState, useEffect } from "react";

function LoadingState({ planLoading, height }) {
  const [currentAnimation, setCurrentAnimation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAnimation((prevAnimation) => (prevAnimation + 1) % 4);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`h-screen flex flex-col items-center justify-center z-50 ${
        planLoading && "bg-white h-[90  vh]"
      }`}
    >
      <div className="flex items-center justify-center space-x-3 mb-10">
        <div className="space-y-3 h-[35vh]">
          <div
            className={`bg-sky-600 h-[70%] w-[150px] ${
              currentAnimation === 0 ? "animate-pulse-fast" : ""
            }`}
          />
          <div
            className={`bg-sky-600 w-[150px] h-[30%]  ${
              currentAnimation === 3 ? "animate-pulse-fast" : ""
            }`}
          />
        </div>

        <div className="space-y-3 h-[35vh]">
          <div
            className={`bg-sky-600 w-[150px] h-[25%]  ${
              currentAnimation === 1 ? "animate-pulse-fast" : ""
            }`}
          />
          <div
            className={`bg-sky-400 w-[150px] h-[75%]  ${
              currentAnimation === 2 ? "animate-pulse-fast" : ""
            }`}
          />
        </div>
      </div>

      {planLoading ? (
        <h1 className="text-center w-[50vw] font-semibold text-3xl">
          Have a small coffee break while we prepare your desired house plans
          for you!☕
        </h1>
      ) : (
        <>
          {location.pathname === "/userprofile" ||
            (location.pathname === "/dashboard" && (
              <h1
                className={`text-center w-[50vw] text-white font-semibold text-3xl ${
                  location.pathname === "/workspace" && "text-black"
                }`}
              >
                Your account is being deleted. Please wait.
              </h1>
            ))}
        </>
      )}
    </div>
  );
}

export default LoadingState;
