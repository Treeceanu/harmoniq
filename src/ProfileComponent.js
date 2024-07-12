import React from 'react';
import './ProfileComponent.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton } from '@mui/material';

function ProfileComponent({ isVisible, onClose }) {
  return (
    <div className={`profile-overlay ${isVisible ? 'profile-visible' : ''}`}>
      <div className="profile-content">
        <IconButton className="close-button" onClick={onClose}>
            <ArrowBackIcon />
        </IconButton>
        <h1>Profile</h1>
      </div>
    </div>
  );
}

export default ProfileComponent;
