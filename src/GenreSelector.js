import React, { useState, useEffect } from 'react';
import { Menu, MenuItem, Button } from '@mui/material';
import { genreMap } from './genreMapping'; // Import genre mapping
import { useDispatch } from 'react-redux';
import { fetchSongs } from './store'; // Adjust import based on your file structure

const GenreSelector = () => {
  const [genres, setGenres] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();

  // Fetch or define genres
  useEffect(() => {
    // Example static genres; replace with your own fetching logic if needed
    const staticGenres = Object.keys(genreMap); // Use the keys from genreMap for user-friendly genre names
    setGenres(staticGenres);
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (genre) => {
    setAnchorEl(null);
    if (genre) {
      // Map user-friendly genre to Spotify format
      const formattedGenre = genreMap[genre] || genre;
      dispatch(fetchSongs(formattedGenre)); // Dispatch fetchSongs with selected genre
    }
  };

  return (
    <div>
      <Button className='menu-button' onClick={handleClick}>Select Genre</Button>
      <Menu
        className='menu'
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleClose(null)}
      >
        {genres.map((genre) => (
          <MenuItem key={genre} className='menu-item' onClick={() => handleClose(genre)}>
            {genre}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default GenreSelector;
