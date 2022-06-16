import { createSlice } from '@reduxjs/toolkit';

export default createSlice({
    name: 'videos',
    initialState: {
        videosWithUsers: null,
        indexCurrentVideo: null,
        currentTimeVideo: 0,
        volumeVideo: 0.5
    },
    reducers: {
        setVideosWithUsers: (state, action) => {
            state.videosWithUsers = action.payload;
        },
        setIndexCurrentVideo: (state, action) => {
            state.indexCurrentVideo = action.payload;
        },
        setCurrentTimeVideo: (state, action) => {
            state.currentTimeVideo = action.payload;
        },
        setVolumnVideo: (state, action) => {
            state.volumeVideo = action.payload;
        }
    }
}) 