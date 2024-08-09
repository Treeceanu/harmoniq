import React, { useEffect, useState } from "react";
import "./SongCards.css";
import TinderCard from "react-tinder-card";
import axios from "./axios";
import SwipeButtons from "./SwipeButtons";

function SongCards({swiped}) {
  const [songs, setSongs] = useState([]);
  const [displayedSong, setDisplayedSong] = useState({});

  console.log(songs);
  console.log("sdfghjmk,",displayedSong);

  
  const outOfFrame = (name) => {
    console.log(name + "left the scene!");
  };

  return (
    <div className="SongCards">
      <div className="SongCards__cardContainer" style={{ overflow: "hidden" }}>
        {songs.map((song, index) => (
          <TinderCard
            className="swipe"
            key={song.name}
            preventSwipe={["up", "down"]}
            onSwipe={(dir) => swiped(dir, song.name)}
            onCardLeftScreen={() => outOfFrame(song.name)}
          >
            <div
              key={index}
              style={{ backgroundImage: `url(${song.imgUrl})` }}
              className="card"
            >
              <h3>{song.name}</h3>
            </div>
          </TinderCard>
        ))}
        
      </div>
      <SwipeButtons swiped={swiped} displayedSong={displayedSong? displayedSong : null}/>
    </div>
  );
}

export default SongCards;
