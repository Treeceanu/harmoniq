import { configureStore, createSlice } from '@reduxjs/toolkit';
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

// Songs slice
const songsSlice = createSlice({
  name: 'songs',
  initialState: {
    songs: [],
    likedSongs: [],  // Added to store liked songs
    status: 'idle',
  },
  reducers: {
    setSongs(state, action) {
      state.songs = action.payload;
      state.status = 'succeeded';
    },
    likeSong(state, action) {
      // Add liked song to likedSongs array and remove it from the songs array
      state.likedSongs.push(action.payload);
      state.songs = state.songs.filter(song => song.name !== action.payload.name);
    },
    setSongsStatus(state, action) {
      state.status = action.payload;
    },
  },
});

export const { setSongs, likeSong, setSongsStatus } = songsSlice.actions;

export const fetchSongs = () => async (dispatch) => {
  dispatch(setSongsStatus('loading'));
  try {
    const response = await axios.get('http://localhost:8001/harmoniq/cards', { withCredentials: true });
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

export default store;
