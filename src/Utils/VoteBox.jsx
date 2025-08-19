import { voteComment } from "@/redux/commentSlice";
import React, { useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

const VoteBox = ({ commentId }) => {
  const dispatch = useDispatch();
  const { comments } = useSelector((state) => state.comments);

  const scoreRef = useRef(0);
  const [, setTick] = useState(0); // dummy state to trigger re-render

  // Helper to find nested comment
  const findComment = (list, id) => {
    for (let c of list) {
      if (c.id === id) return c;
      if (c.replies) {
        const nested = findComment(c.replies, id);
        if (nested) return nested;
      }
    }
    return null;
  };

  // Sync ref with Redux whenever comments change
  useEffect(() => {
    if (Array.isArray(comments)) {
      const found = findComment(comments, commentId);
      if (found) {
        scoreRef.current = found.score;
        setTick((t) => t + 1); // force re-render when redux updates
      }
    }
  }, [comments, commentId]);

 const handleUpvote = () => {
  scoreRef.current += 1;
  dispatch(voteComment({ id: commentId, delta: 1 }));
  setTick((t) => t + 1);
};

const handleDownvote = () => {
  scoreRef.current -= 1;
  dispatch(voteComment({ id: commentId, delta: -1 }));
  setTick((t) => t + 1);
};

  return (
    <div className="flex md:flex-col gap-4 md:gap-1 items-center bg-gray-100 rounded-lg p-2 md:w-10">
      <button
        onClick={handleUpvote}
        className="text-blue-500 font-bold text-lg hover:text-blue-700"
      >
        +
      </button>
      <span className="text-gray-700 font-semibold">{scoreRef.current}</span>
      <button
        onClick={handleDownvote}
        className="text-blue-500 font-bold text-lg hover:text-blue-700"
      >
        -
      </button>
    </div>
  );
};

export default VoteBox;
