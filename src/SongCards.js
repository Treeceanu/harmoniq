import React, { useEffect, useState } from 'react';
import "./SongCards.css";
import TinderCard from "react-tinder-card";
import axios from './axios';

function SongCards() {
  const [songs, setSongs] = useState([]);
  useEffect(() => {
    async function fetchData(){
      const req= await axios.get('/harmoniq/cards');

      setSongs(req.data);
    }
    fetchData();

  }, []);
  console.log(songs);
 
  const swiped = (direction, nameToDelete) =>{
    console.log("removing:" +nameToDelete)
    //setLastDirection(direction);
  };
  const outOfFrame = (name) =>{
    console.log(name+"left the scene!")
  }

    return (
    <div className='SongCards'>
        <div className='SongCards__cardContainer' style={{overflow:'hidden'}}>
        {songs.map(song =>(     
          <TinderCard 
          className='swipe'
          key={song.name}
          preventSwipe={["up","down"]}
          onSwipe={(dir) =>  swiped(dir, song.name)}
          onCardLeftScreen={() =>  outOfFrame(song.name)}

          >
            <div style={{backgroundImage: `url(${songs[0].imgUrl})`}} className='card'>
              <h3>{songs.name}</h3>
            </div>
            
          </TinderCard>
        ))}
        </div>

    </div>
  )
}

export default SongCards