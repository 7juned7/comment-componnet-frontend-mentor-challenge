"use client";
import { addComment, addReply, updateComment } from "@/redux/commentSlice";
import Image from "next/image";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

const ReplyInput = ({ parentId = null, mode = "comment", initialValue = "", commentId = null, onFinish }) => {
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const { currentUser, comments } = useSelector((state) => state.comments);

  if (!currentUser) return null;

  const handleSend = () => {
    const text = inputRef.current?.value.trim();
    if (!text) return;

    if (mode === "comment") {
      dispatch(
        addComment({
          id: Date.now(),
          content: text,
          createdAt: "Just now",
          score: 0,
          user: currentUser,
          replies: [],
        })
      );
    }  else if (mode === "reply" && parentId) {
   const findCommentById = (commentsList, id) => {
    for (let c of commentsList) {
      if (c.id === id) return c;
      if (c.replies && c.replies.length > 0) {
        const found = findCommentById(c.replies, id);
        if (found) return found;
      }
    }
    return null;
  };

  const parentComment = findCommentById(comments, parentId);
  const replyingTo = parentComment?.user.username || "";

  dispatch(
    addReply({
      parentId: parentId, // the id of the comment you are replying to
      reply: {
        id: Date.now(), // unique id for the reply
        content: ` ${text}`,  // the text from input
        createdAt: "Just now", // or any formatted timestamp
        score: 0,
        replyingTo: replyingTo, // use the variable defined above
        user: {
          image: {
            png: currentUser.image.png.replace("./", "/"),
            webp: currentUser.image.webp.replace("./", "/"),
          },
          username: currentUser.username,
        },
      },
    })
  );

}else if (mode === "edit" && commentId) {
      console.log(commentId)
      dispatch(updateComment({ id: commentId, content: text }));
      if (onFinish) onFinish(); // close edit mode
    }

    inputRef.current.value = "";
  };

  return (
    <div className={`flex items-start gap-4 bg-white ${mode==='edit'? '' : 'p-4 rounded-xl shadow-md'}`}>
      <Image
        src={currentUser.image.png.replace("./", "/")}
        alt={currentUser.username}
        height={32}
        width={32}
        className="w-8 h-8 rounded-full"
        loading="lazy"
      />
      <textarea
        ref={inputRef}
        defaultValue={initialValue}
        autoFocus={mode === "edit"}
        placeholder="Add a comment..."
        className="flex-1 border h-32 rounded-lg p-2 text-gray-700 resize-none"
      />
      <button
        onClick={handleSend}
        className="bg-blue-900 hover:bg-blue-300 cursor-pointer text-white px-4 py-2 rounded-lg font-bold"
      >
        {mode === "comment" ? "Send" : mode === "reply" ? "Reply" : "Update"}
      </button>
    </div>
  );
};

export default ReplyInput;
