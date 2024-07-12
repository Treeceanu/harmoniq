// src/App.js
import React, { useState } from 'react';
import './App.css';
import Header from './Header';
import SongCards from './SongCards';
import SwipeButtons from './SwipeButtons';
import TabComponent from './TabComponent';
import ProfileComponent from './ProfileComponent'; // Import the ProfileComponent

function App() {
  const [showTab, setShowTab] = useState(false);
  const [showProfile, setShowProfile] = useState(false); // State for ProfileComponent

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

  return (
    <div className="app">
      <Header toggleTab={toggleTab} toggleProfile={toggleProfile} /> {/* Pass the function as a prop */}
      <TabComponent isVisible={showTab} onClose={closeTab} /> {/* Pass isVisible and onClose props */}
      <ProfileComponent isVisible={showProfile} onClose={closeProfile} /> {/* Pass isVisible and onClose props */}
      <div className={`main-content ${showTab || showProfile ? 'main-content-overlay' : ''}`}>
        <SongCards />
        <SwipeButtons />
      </div>
    </div>
  );
}

export default App;
