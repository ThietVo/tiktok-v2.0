import { configureStore } from "@reduxjs/toolkit";
import modalSlice from "./modalSlice";
import userLoginSlice from "./userLoginSlice";
import uploadSlice from "./uploadSlice";

const store = configureStore({
    reducer: {
        userLogin: userLoginSlice.reducer,
        modal: modalSlice.reducer,
        upload: uploadSlice.reducer,
    },
});

export default store;