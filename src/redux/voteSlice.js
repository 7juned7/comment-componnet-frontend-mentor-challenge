// votesSlice.js
import { createSlice } from "@reduxjs/toolkit";

const votesSlice = createSlice({
  name: "votes",
  initialState: {}, // { [commentId]: score }
  reducers: {
    upvote: (state, action) => {
      const id = action.payload;
      state[id] = (state[id] || 0) + 1;
    },
    downvote: (state, action) => {
      const id = action.payload;
      state[id] = (state[id] || 0) - 1;
    },
  },
});

export const { upvote, downvote } = votesSlice.actions;
export default votesSlice.reducer;