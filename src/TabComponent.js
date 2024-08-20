import React from 'react';
import './TabComponent.css';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { IconButton } from '@mui/material';

function TabComponent({ isVisible, onClose, likedSongs = [] }) {
  return (
    <div className={`tab-overlay ${isVisible ? 'tab-visible' : ''}`}>
      <div className="tab-content">
        <IconButton className="close-button" onClick={onClose}>
          <ArrowForwardIcon />
        </IconButton>
        <h1>Liked Songs</h1>
        {likedSongs.length === 0 ? (
          <p>No liked songs yet.</p>
        ) : (
          <ul>
            {likedSongs.map((song) => (
              <li key={song.name}>
                <img src={song.imgUrl} alt={song.name} />
                <div>
                  <h4>{song.name}</h4>
                  <p>{song.artist}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default TabComponent;