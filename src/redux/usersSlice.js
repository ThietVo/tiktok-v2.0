import { createSlice} from '@reduxjs/toolkit';

export default createSlice({
    name: 'users',
    initialState: {
        userLogged: {}
    },
    reducers: {
        setUserLogin: (state, action) => {
            state.userLogged = action.payload;
        },
        updateUserLogin: (state, action) => {
            state.userLogged = {...state.userLogged,...action.payload};
        }
    }
})