import { configureStore } from "@reduxjs/toolkit";
import modalSlice from "./modalSlice";
import usersSlice from "./usersSlice";
import uploadSlice from "./uploadSlice";
import videosSlice from "./videosSlice";
import likedVideosSlice from "./likedVideosSlice";

const store = configureStore({
    reducer: {
        users: usersSlice.reducer,
        modal: modalSlice.reducer,
        upload: uploadSlice.reducer,
        videos: videosSlice.reducer,
        likedVideos: likedVideosSlice.reducer,
    },
});

export default store;