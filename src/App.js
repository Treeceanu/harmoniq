// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './App.css';
import Header from './Header';
import SongCards from './SongCards';
import SwipeButtons from './SwipeButtons';
import TabComponent from './TabComponent';
import ProfileComponent from './ProfileComponent'; // Import the ProfileComponent

function App() {
  const [showTab, setShowTab] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  useEffect(() => {
    async function fetchData() {
      const req = await axios.get("/harmoniq/cards");

      setSongs(req.data);
      setDisplayedSong(req.data[0]);

    }
    fetchData();
  }, []);
  const [songs, setSongs] = useState([]);
  
  const [displayedSong, setDisplayedSong] = useState({});

  const toggleTab = () => {
    setShowTab(!showTab);
  };

  const toggleProfile = () => {
    setShowProfile(!showProfile);
  };

  const closeTab = () => {
    setShowTab(false);
  };

  const closeProfile = () => {
    setShowProfile(false);
  };
  const swiped = (direction, nameToDelete) => {
    console.log("removing:" + nameToDelete);
    //setLastDirection(direction);
  };

  return (
    <div className="app">
      <Header toggleTab={toggleTab} toggleProfile={toggleProfile} /> {/* Pass the function as a prop */}
      <TabComponent isVisible={showTab} onClose={closeTab} /> {/* Pass isVisible and onClose props */}
      <ProfileComponent isVisible={showProfile} onClose={closeProfile} /> {/* Pass isVisible and onClose props */}
      <div className={`main-content ${showTab || showProfile ? 'main-content-overlay' : ''}`}>
        <SongCards swiped={swiped}/>
        
      </div>
    </div>
  );
}

export default App;
