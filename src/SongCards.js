import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import './SongCards.css';
import TinderCard from 'react-tinder-card';
import AudioPlayer from './AudioPlayer';
import { IconButton } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CloseIcon from '@mui/icons-material/Close';

Modal.setAppElement('#root');

function SongCards({ songs = [], swiped, outOfFrame }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);

  const openModal = (song) => {
    setCurrentSong(song);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setCurrentSong(null);
  };

  return (
    <div className="songCards">
      {songs.length === 0 ? (
        <div className="loadingContainer">
          <CircularProgress />
          <p>Loading songs...</p>
        </div>
      ) : (
        songs.map((song) => (
          <TinderCard
            className="swipe"
            key={song.name}
            onSwipe={(dir) => swiped(dir, song.name)}
            onCardLeftScreen={() => outOfFrame(song.name)}
            preventSwipe={['up', 'down']}
          >
            <div
              style={{ backgroundImage: `url(${song.imgUrl})` }}
              className="card"
            >
              <div className="cardContent">
                <h3>{song.name}</h3>
              </div>
              <IconButton
                className="playButton"
                onClick={() => openModal(song)}
                color="primary"
              >
                <PlayArrowIcon className='playArrowIcon'  />
              </IconButton>
            </div>
          </TinderCard>
        ))
      )}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Song Modal"
        className="Modal"
        overlayClassName="Overlay"
      >
        {currentSong ? (
          <div className="modalContent">
            <h2>{currentSong.name}</h2>
            <AudioPlayer src={currentSong.previewUrl} title={currentSong.name} artist={currentSong.artist} />
            <IconButton className="closeButton" onClick={closeModal} color="secondary">
              <CloseIcon />
            </IconButton>
          </div>
        ) : (
          <p>No song selected</p>
        )}
      </Modal>
    </div>
  );
}

SongCards.propTypes = {
  songs: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      imgUrl: PropTypes.string.isRequired,
      previewUrl: PropTypes.string,
      artist: PropTypes.string,
    })
  ).isRequired,
  swiped: PropTypes.func.isRequired,
  outOfFrame: PropTypes.func.isRequired,
};

export default SongCards;
