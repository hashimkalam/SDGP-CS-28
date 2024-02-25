import React from "react";
import "./workspace.css"; // Import the CSS file
import Form from "../../components/form/form";

function workspace() {
  return (
    <div className="workspace-area">
      <div className="workspace-container">
        <div className="input-field">
          <Form />
        </div>
      </div>
    </div>
  );
}

export default workspace;
