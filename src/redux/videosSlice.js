import { createSlice } from '@reduxjs/toolkit';

export default createSlice({
    name: 'videos',
    initialState: {
        videosWithUsers: null,
        indexCurrentVideo: null,
    },
    reducers: {
        setVideosWithUsers: (state, action) => {
            state.videosWithUsers = action.payload;
        },
        setIndexCurrentVideo: (state, action) => {
            state.indexCurrentVideo = action.payload;
        }
    }
}) 