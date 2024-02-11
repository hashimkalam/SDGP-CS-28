import React, { useState } from 'react';
import { Logo } from '../../components/Logo/logo';
import { FaUserCircle } from 'react-icons/fa'; // Import the user icon
import './workspace.css'; 
import { Button } from "@mui/material";

function Workspace() {
  const [output, setOutput] = useState(null);

  const generateOutput = () => {
    setOutput('images/floorplan.svg');
  };

  const buttonStyles = {
    background: "rgba(0, 101, 255, .75)",
    color: "#fff",
    padding: "13px",
    "&:hover": {
      background: "rgba(0, 101, 255, 1)",
    },
  };

  return (
    <div className='workspace-area'>
      <div className='header-workspace'>
        <Logo />
          
        <div className='profile'>
        {output && <Button className="download-btn" sx={buttonStyles}>Download Now</Button>}
        <FaUserCircle className='profile-icon'/> 
        </div>
      </div>
      <div className='workspace-container'>
      {output && (
          <div className='output-field'>
            <img src={output} alt="Output" />
          </div>
        )}
        <div className='input-field'>
          <input type="text" />
          <button onClick={generateOutput}>Generate</button>
        </div>
        
      </div>
    </div>
  )
}

export default Workspace;