import { createSlice } from '@reduxjs/toolkit';

export default createSlice({
    name: 'search',
    initialState: {
        searchResult: []
    },
    reducers: {
        setSearchResult: (state, action) => {
            state.searchResult = action.payload;
        }
    }
}) 