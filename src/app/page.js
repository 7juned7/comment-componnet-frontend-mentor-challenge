"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommentBox from "@/Components/CommentBox";
import ReplyInput from "@/Utils/ReplyInput";
import { setComments } from "@/redux/commentSlice";
import data from "../data/data.json";

export default function Home() {
  const dispatch = useDispatch();
  const { currentUser, comments } = useSelector((state) => state.comments);

  useEffect(() => {
    dispatch(setComments(data));
  }, [dispatch]);

  return (
    <div className="bg-gray-200 min-h-screen w-full flex justify-center items-start p-6">
      <div className="w-full max-w-4xl flex flex-col gap-6">
        {comments.map((comment) => (
          <div key={comment.id}>
            {/* Render top-level comment */}
            <CommentBox comment={comment} currentUser={currentUser} />

            {/* Render only top-level replies */}
            {comment.replies && comment.replies.length > 0 && (
              <div className=" ml-2 pl-2   md:ml-8 md:pl-6 border-l-2 border-gray-300 space-y-4 mt-4">
                {comment.replies.map((reply) => (
                  <CommentBox
                    key={reply.id}
                    comment={reply}
                    isReply={true}
                    currentUser={currentUser}
                  />
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Input for new top-level comment */}
        <ReplyInput mode="comment" />
      </div>
    </div>
  );
}
