import React, {useEffect} from 'react';
import './TabComponent.css';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { IconButton } from '@mui/material';

function TabComponent({ isVisible, onClose, likedSongs = [] }) {
  useEffect(() => {
    if (!isVisible) {
      console.log('Clearing liked songs display');
    }
  }, [isVisible]);
  
  // const handleLogout = async () => {
  //   try {
  //     await axios.post('http://localhost:8001/logout', {}, { withCredentials: true });
  //     dispatch(logoutAndClearSongs());  // Clear songs and logout
  //   } catch (error) {
  //     console.error('Logout failed:', error);
  //   }
  // };
 

  
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
              <li key={song.name} className="song-item">
                <img src={song.imgUrl} alt={song.name} className="song-img" />
                <div className="song-details">
                  <h4>{song.name}</h4>
                  <p>{song.artist}</p>
                  {song.previewUrl && (
                    <audio controls className="song-preview">
                      <source src={song.previewUrl} type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                  )}
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
