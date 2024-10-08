import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import axios from "axios";
import Header from "./Header";
import SongCards from "./SongCards";
import SwipeButtons from "./SwipeButtons";
import TabComponent from "./TabComponent";
import ProfileComponent from "./ProfileComponent";
import GenreSelector from "./GenreSelector";
import { useSelector, useDispatch } from "react-redux";
import { loginSuccess, fetchSongs, likeSong, setSongs } from "./store";

function App() {
  const [showTab, setShowTab] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState("");
  const cardRef = useRef(null);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const songs = useSelector((state) => state.songs.songs);
  const likedSongs = useSelector((state) => state.songs.likedSongs);
  const songStatus = useSelector((state) => state.songs.status);
  

  useEffect(() => {
    if (songStatus === "idle") {
      console.log("Dispatching fetchSongs...");
      dispatch(fetchSongs(selectedGenre));
    }
  }, [songStatus, dispatch, selectedGenre]);

  useEffect(() => {
    if (showTab || showProfile) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    return () => document.body.classList.remove("no-scroll");
  }, [showTab, showProfile]);

  const handleLike = () => {
    const songToLike = songs[0]; // Get the first song in the list
    if (songToLike) {
      dispatch(likeSong(songToLike));
      if (cardRef.current && cardRef.current.swipe) {
        cardRef.current.swipe("right");
      } else {
        console.error("Swipe method not available on cardRef");
      }
    }
  };
  
  const handleDislike = (songId) => {
    const isAuthenticated = !!user;
    if (!isAuthenticated) {
      alert("Please login to dislike a song.");
      return;
    }

    try {
      // Dislike the song
      axios.post(
        "http://localhost:8001/disliked-songs",
        { songId },
        { withCredentials: true }
      );

      // Swipe the card left
      if (cardRef.current && cardRef.current.swipe) {
        cardRef.current.swipe("left");
      } else {
        console.error("Swipe method not available on cardRef");
      }
    } catch (error) {
      console.error("Error disliking song:", error);
    }
  };

  const toggleTab = () => {
    setShowTab(!showTab);
  };

  const handleSwipe = (direction) => {
    if (cardRef.current) {
      cardRef.current.swipe(direction);
    }
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
    if (direction === "right") {
      const likedSong = songs.find((song) => song.name === nameToDelete);
      if (likedSong) {
        dispatch(likeSong(likedSong));
      }
    }
  };

  const outOfFrame = (name) => {
    console.log(`${name} left the screen!`);
  };
  // eslint-disable-next-line no-unused-vars
  const handleLogin = async (email, password) => {
    try {
      const response = await axios.post("http://localhost:8001/login", {
        email,
        password,
      });
      if (response.status === 200) {
        const userData = response.data.user;
        dispatch(loginSuccess(userData));
  
        // Fetch liked songs after login
        const likedSongsResponse = await axios.get("http://localhost:8001/liked-songs", { withCredentials: true });
        dispatch(setSongs({ likedSongs: likedSongsResponse.data }));
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };
  
  
  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre);
    console.log("Selected genre:", genre);
  };

  // Example genres; replace with actual genres if available
  const genres = [
    "Pop",
    "Rock",
    "Jazz",
    "Hip-Hop",
    "Classical",
    "Metal",
    "Drum and Bass",
    "Dubstep",
    "Techno",
    "Hardstyle",
  ];

  return (
    <div className="app">
      <Header toggleTab={toggleTab} toggleProfile={toggleProfile} />
      <TabComponent
        isVisible={showTab}
        onClose={closeTab}
        likedSongs={likedSongs}
      />
      <ProfileComponent
        isVisible={showProfile}
        onClose={closeProfile}
        user={user}
      />
      <div
        className={`main-content ${
          showTab || showProfile ? "main-content-overlay" : ""
        }`}
      >
        <SongCards
          ref={cardRef}
          songs={songs}
          swiped={swiped}
          outOfFrame={outOfFrame}
        />
        <SwipeButtons
          displayedSong={songs[0]}
          onLike={handleLike}
          onSwipe={handleSwipe}
          onDislike={handleDislike}
        />
        <div className="genre-selector-container">
          <GenreSelector genres={genres} onSelectGenre={handleGenreSelect} />
        </div>
      </div>
    </div>
  );
}

export default App;