import axios from 'axios';

// Fetch liked songs for a user
export const fetchLikedSongs = async (userId) => {
  try {
    const response = await axios.get(`/api/user/${userId}/liked-songs`);
    return response.data;
  } catch (error) {
    console.error('Error fetching liked songs', error);
    throw error; // Re-throw the error to handle it in the calling function
  }
};

// Add a liked song
export const addLikedSong = async (userId, song) => {
  try {
    await axios.post(`/api/user/${userId}/liked-songs`, { song });
  } catch (error) {
    console.error('Error adding liked song', error);
    throw error; // Re-throw the error to handle it in the calling function
  }
};

// Remove a liked song
export const removeLikedSong = async (userId, song) => {
  try {
    await axios.delete(`/api/user/${userId}/liked-songs`, { data: { song } });
  } catch (error) {
    console.error('Error removing liked song', error);
    throw error; // Re-throw the error to handle it in the calling function
  }
};
