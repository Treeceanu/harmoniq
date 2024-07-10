import React from 'react';
import './App.css';
import Header from './Header';
import SongCards from './SongCards';
import SwipeButtons from './SwipeButtons';

function App() {
  return (
    <div className="app">
      <Header />
      <SongCards />
      <SwipeButtons />
    </div>
  );
}

export default App;
