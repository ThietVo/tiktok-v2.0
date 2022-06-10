import { createSlice } from '@reduxjs/toolkit';

export default createSlice({
    name: 'likedVideos',
    initialState: {
        likedVideos: [],
    },
    reducers: {
        setAddLikedVideo: (state, action) => {
            state.likedVideos = state.likedVideos.concat(action.payload);
        },
        setLikedVideos: (state, action) => {
            state.likedVideos = action.payload;
        }
    }
})