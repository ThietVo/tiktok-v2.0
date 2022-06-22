import { createSlice } from '@reduxjs/toolkit';

export default createSlice({
    name: 'comment',
    initialState: {
        parentId: null,
        replyUsername: null,
        commentIdToDel: null,
    },
    reducers: {
        setComment: (state, action) => {
            state.parentId = action.payload.parentId;
            state.replyUsername = action.payload.replyUsername;
            state.commentIdToDel = action.payload.commentIdToDel;
        },
        setParentId: (state, action) => {
            state.parentId = action.payload;
        },
        setReplyUsername: (state, action) => {
            state.replyUsername = action.payload;
        },
        setReload: (state, action) => {
            state.reload = action.payload;
        },
        setCommentIdToDel: (state, action) => {
            state.commentIdToDel = action.payload;
        }
    }
})