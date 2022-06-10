import { createSlice} from '@reduxjs/toolkit';

export default createSlice({
    name: 'users',
    initialState: {
        userLogged: {},
        userDetailId: ''
    },
    reducers: {
        setUserLogin: (state, action) => {
            state.userLogged = action.payload;
        }, 
        setUserDetailId: (state, action) => {
            state.userDetailId = action.payload;
        }
    }
})