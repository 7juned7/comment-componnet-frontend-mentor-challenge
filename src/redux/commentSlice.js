import { createSlice } from "@reduxjs/toolkit";

const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    currentUser: null,
    comments: [],
  },
  reducers: {
   setComments: (state, action) => {
  state.currentUser = action.payload.currentUser;
  state.comments = action.payload.comments;
 
},
    addComment: (state, action) => {
      state.comments.push(action.payload);
    },
addReply: (state, action) => {
  const { parentId, reply } = action.payload;

  // Find the top-level comment whose replies include the parentId
  const topLevelComment = state.comments.find(
    (comment) =>
      comment.id === parentId || comment.replies.some((r) => r.id === parentId)
  );

  if (!topLevelComment) {
    console.error("Parent comment not found:", parentId);
    return;
  }

  // Push the reply into the top-level comment's replies array
  if (!topLevelComment.replies) topLevelComment.replies = [];
  topLevelComment.replies.push(reply);
  console.log("Added reply:", reply, "to parent:", topLevelComment.id);
}
,



 updateComment: (state, action) => {
  const { id, content } = action.payload;

  const findComment = (commentsList, id) => {
    for (let c of commentsList) {
      if (c.id === id) return c;
      if (c.replies && c.replies.length > 0) {
        const found = findComment(c.replies, id);
        if (found) return found;
      }
    }
    return null;
  };

  const comment = findComment(state.comments, id);
  if (comment) comment.content = content;
},
   deleteComment: (state, action) => {
  const { id } = action.payload;

  // Case 1: Remove top-level comment
  const topLevelIndex = state.comments.findIndex((c) => c.id === id);
  if (topLevelIndex !== -1) {
    state.comments.splice(topLevelIndex, 1);
    return;
  }

  // Case 2: Remove from replies (only one nesting level if that’s your design)
  state.comments.forEach((comment) => {
    if (comment.replies) {
      const replyIndex = comment.replies.findIndex((r) => r.id === id);
      if (replyIndex !== -1) {
        comment.replies.splice(replyIndex, 1);
      }
    }
  });
}, 
 voteComment: (state, action) => {
  const { id, delta } = action.payload;

  const updateScore = (commentsList) => {
    for (let c of commentsList) {
      if (c.id === id) {
        c.score = Number(c.score) + Number(delta); // ✅ ensure numbers
        return true;
      }
      if (c.replies && c.replies.length > 0) {
        if (updateScore(c.replies)) return true;
      }
    }
    return false;
  };

  updateScore(state.comments);
},

  },
});

export const {
  setComments,
  addComment,
  addReply,
  updateComment,
  deleteComment,
   voteComment, 
} = commentsSlice.actions;

export default commentsSlice.reducer;
