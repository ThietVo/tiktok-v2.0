import { createSlice } from '@reduxjs/toolkit';

export default createSlice({
    name: 'upload',
    initialState: {
        hasPublic: true,
        hasComment: true,
        progess: 0,
        uploaded: false,
    },
    reducers: {
        setPublicVideo: (state, action) => {
            state.hasPublic = action.payload;
        },
        setHasCommentVideo: (state, action) => {
            state.hasComment = action.payload;
        },
        setProgess: (state, action) => {
            state.progess = action.payload;
        },
        setUploaded: (state, action) => {
            state.uploaded = action.payload;
        }
    }
})