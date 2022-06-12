import { createSlice } from '@reduxjs/toolkit';

export default createSlice({
    name: 'search',
    initialState: {
        searchValue: ''
    },
    reducers: {
        setSearchValue: (state, action) => {
            state.searchValue = action.payload;
        }
    }
}) 