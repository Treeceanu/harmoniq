import React, { useState, useRef, useEffect } from 'react';
import { Button, Slider, Typography, Box } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import './AudioPlayer.css'; // Import the CSS file

const AudioPlayer = ({ src, title, artist }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const interval = setInterval(() => {
      if (audio && isPlaying) {
        setCurrentTime(audio.currentTime);
      }
    }, 1000);

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);

    return () => {
      clearInterval(interval);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, [isPlaying]);

  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play().catch(error => console.error('Error playing audio:', error));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSliderChange = (event, newValue) => {
    setCurrentTime(newValue);
    if (audioRef.current) {
      audioRef.current.currentTime = newValue;
    }
  };

  const handleSkip = (seconds) => {
    if (audioRef.current) {
      audioRef.current.currentTime += seconds;
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  return (
    <Box className="audioPlayerContainer">
      <Typography variant="h6"></Typography>
      <Typography variant="subtitle1" color="textSecondary">{artist}</Typography>
      <audio ref={audioRef} src={src} />
      <Box className="controlsContainer">
        <Button
          onClick={() => handleSkip(-10)}
          color="inherit"
        >
          <SkipPreviousIcon />
        </Button>
        <Button
          variant="contained"
          color={isPlaying ? 'secondary' : 'primary'}
          onClick={handlePlayPause}
        >
          {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
        </Button>
        <Button
          onClick={() => handleSkip(10)}
          color="inherit"
        >
          <SkipNextIcon />
        </Button>
      </Box>
      <Box className="progressBarContainer">
        <Slider
          value={currentTime}
          min={0}
          max={duration}
          onChange={handleSliderChange}
          aria-labelledby="audio-slider"
          sx={{ color: '#ffffff' }} // Spotify green color
        />
        <Box className="timeDisplay">
          <Typography variant="caption">
            {Math.floor(currentTime / 60)}:{Math.floor(currentTime % 60).toString().padStart(2, '0')}
          </Typography>
          <Typography variant="caption">
            {Math.floor(duration / 60)}:{Math.floor(duration % 60).toString().padStart(2, '0')}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default AudioPlayer;
