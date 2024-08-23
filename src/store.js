import { configureStore, createSlice } from '@reduxjs/toolkit';
import { fetchLikedSongs, addLikedSong, removeLikedSong } from './songService';
import 'dotenv/config';
import { thunk } from 'redux-thunk';
import axios from 'axios';

// User slice
const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLoggedIn: false,
    user: null,
  },
  reducers: {
    loginSuccess(state, action) {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

export const { loginSuccess, logout } = userSlice.actions;
export const ADD_LIKED_SONG = 'ADD_LIKED_SONG';
export const REMOVE_LIKED_SONG = 'REMOVE_LIKED_SONG';
export const  SET_LIKED_SONGS = 'SET_LIKED_SONGS';


// Songs slice
const songsSlice = createSlice({
  name: 'songs',
  initialState: {
    songs: [],
    likedSongs: [],
    status: 'idle',
  },
  reducers: {
    setSongs(state, action) {
      state.songs = action.payload;
      state.status = 'succeeded';
    },
    likeSong(state, action) {
      const newLikedSong = action.payload;
      if (!state.likedSongs.some(song => song.name === newLikedSong.name)) {
        state.likedSongs.push(newLikedSong); // Use push to add at the end
      }
      state.songs = state.songs.filter(song => song.name !== newLikedSong.name);
    },
    setSongsStatus(state, action) {
      state.status = action.payload;
    },
    setLikedSongs(state, action) {
      state.likedSongs = action.payload;
    },
    clearLikedSongs(state) {
      state.likedSongs = [];
    },
  },
});

export const { setSongs, likeSong, setSongsStatus,  clearLikedSongs } = songsSlice.actions;


export const fetchSongs = (genre) => async (dispatch) => {
  dispatch(setSongsStatus('loading'));
  try {
    
    
    const response = await axios.get(`${process.env.REACT_APP_BACKEND}/harmoniq/cards?genre=${genre}`, { withCredentials: true });
    dispatch(setSongs(response.data));
  } catch (error) {
    console.error('Failed to fetch songs:', error.response ? error.response.data : error.message);
    dispatch(setSongsStatus('failed'));
  }
};
// Configure the store
const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    songs: songsSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});
export const setLikedSongs = (songs) => ({
  type: SET_LIKED_SONGS,
  payload: songs,
});

export const addLikedSongAction = (song) => async (dispatch, getState) => {
  const { userId } = getState().user; // Assume userId is in the state
  try {
    await addLikedSong(userId, song);
    dispatch({ type: ADD_LIKED_SONG, payload: song });
  } catch (error) {
    console.error('Error adding song', error);
  }
};

export const removeLikedSongAction = (song) => async (dispatch, getState) => {
  const { userId } = getState().user; // Assume userId is in the state
  try {
    await removeLikedSong(userId, song);
    dispatch({ type: REMOVE_LIKED_SONG, payload: song });
  } catch (error) {
    console.error('Error removing song', error);
  }
};

export default store;