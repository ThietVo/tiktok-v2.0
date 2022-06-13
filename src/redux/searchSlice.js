import { createSlice } from '@reduxjs/toolkit';

export default createSlice({
    name: 'search',
    initialState: {
        searchUserResult: [],
        searchVideoResult: []
    },
    reducers: {
        setSearchUserResult: (state, action) => {
            state.searchUserResult = action.payload;
        },
        setSearchVideoResult: (state, action) => {
            state.searchVideoResult = action.payload;
        }
    }
}) 