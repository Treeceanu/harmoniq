// src/TabComponent.js
import React from 'react';
import './TabComponent.css';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { IconButton } from '@mui/material';

function TabComponent({ isVisible, onClose }) {
  return (
    <div className={`tab-overlay ${isVisible ? 'tab-visible' : ''}`}>
      <div className="tab-content">
        <IconButton className="close-button" onClick={onClose}>
            <ArrowForwardIcon />
        </IconButton>
        <h1>Liked Songs</h1>
       
      </div>
    </div>
  );
}

export default TabComponent;
