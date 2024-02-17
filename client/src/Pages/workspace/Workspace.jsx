import React from "react";
import { Logo } from "../../components/Logo/logo";
import { FaUserCircle } from "react-icons/fa"; // Import the user icon
import "./workspace.css"; // Import the CSS file
import { useSelector } from "react-redux";

function workspace() {
  const { currentUser } = useSelector((state) => state.user); // Get the current user from the state
  return (
    <div className="workspace-area">
      <div className="header-workspace">
        <Logo />
        <div className="profile-icon">
          {currentUser ? (
            <img
              src={currentUser?.user?.profilePicture}
              alt="profilePicture"
              className="h-9 w-9 rounded-full object-cover"
            />
          ) : (
            <FaUserCircle />
          )}
        </div>
      </div>
      <div className="workspace-container">
        <div className="input-field">
          <input type="text" />
          <button>Generate</button>
        </div>
      </div>
    </div>
  );
}

export default workspace;
