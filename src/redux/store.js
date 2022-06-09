import { configureStore } from "@reduxjs/toolkit";
import modalSlice from "./modalSlice";
import userLoginSlice from "./userLoginSlice";
import uploadSlice from "./uploadSlice";
import videosSlice from "./videosSlice";

const store = configureStore({
    reducer: {
        userLogin: userLoginSlice.reducer,
        modal: modalSlice.reducer,
        upload: uploadSlice.reducer,
        videos: videosSlice.reducer,
    },
});

export default store;