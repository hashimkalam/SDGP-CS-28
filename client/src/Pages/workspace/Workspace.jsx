import React from 'react';
import { Logo } from '../../components/Logo/logo';
import { FaUserCircle } from 'react-icons/fa'; // Import the user icon
import './workspace.css'; // Import the CSS file

function workspace() {
  return (
    <div className='workspace-area'>
      <div className='header-workspace'>
        <Logo />
        <div className='profile-icon'>
            <FaUserCircle /> 
        </div>
      </div>
      <div className='workspace-container'>

      <div className='input-field'>
            <input type="text" />
            <button>Generate</button>
        </div>
      </div>
      
      </div>
  )
}

export default workspace;