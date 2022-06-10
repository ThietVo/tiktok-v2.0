import { createSlice} from '@reduxjs/toolkit';

export default createSlice({
    name: 'users',
    initialState: {
        userLogged: {}
    },
    reducers: {
        setUserLogin: (state, action) => {
            state.userLogged = action.payload;
        }
    }
})