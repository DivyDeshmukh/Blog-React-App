import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    post: {},
    allPosts: []
}

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        post: (state, action) => {
            state.post = action.payload;
        },
        allPosts: (state, action) => {
            state.allPosts = action.payload;
        }
    }
});

export const { post, allPosts } = postSlice.actions;

export default postSlice.reducer;

