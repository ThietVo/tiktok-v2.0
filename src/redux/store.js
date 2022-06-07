import { configureStore } from "@reduxjs/toolkit";
import modalSlice from "./modalSlice";
import userLoginSlice from "./userLoginSlice";

const store = configureStore({
    reducer: {
        userLogin: userLoginSlice.reducer,
        modal: modalSlice.reducer,
    },
});

export default store;