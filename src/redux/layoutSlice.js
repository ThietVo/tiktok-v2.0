import { createSlice } from '@reduxjs/toolkit';

export default createSlice({
    name: 'layout',
    initialState: {
        hasClassContainer: true
    },
    reducers: {
        setHasClassContainer: (state, action) => {
            state.hasClassContainer = action.payload;
        }
    }
}) 