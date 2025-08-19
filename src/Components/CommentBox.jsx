"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import VoteBox from "@/Utils/VoteBox";
import CommentHeader from "@/Utils/CommentHeader";
import ReplyButton from "@/Utils/ReplyButton";
import ReplyInput from "@/Utils/ReplyInput";
import { Edit2, Trash, Trash2 } from "lucide-react";
import { deleteComment } from "@/redux/commentSlice";

const CommentBox = ({ comment, isReply = false }) => {
  const { currentUser } = useSelector((state) => state.comments);
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const isOwnComment = comment.user.username === currentUser.username;
const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteComment({ id: comment.id }));
  };
  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-xl shadow-md w-full">
        {!isEditing && (

<div className="hidden md:block">

  <VoteBox  commentId={comment.id} />
</div>
        )}
        <div className="flex-1">
          {!isEditing && (

          <div className="flex items-center  justify-between">
            
            <CommentHeader
              avatar={comment.user.image.png.replace("./", "/")}
              username={comment.user.username}
              time={comment.createdAt}
            />
            {isOwnComment && (
              <div className="ml-auto flex  gap-2 text-sm text-gray-500">
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className=" flex text-center gap-1 justify-center items-center hover:text-blue-500 text-blue-400 cursor-pointer"
                >
                  <Edit2 width={16}/>
                  Edit
                </button>
                 <button
                  onClick={() => handleDelete()}
                  className="flex  text-center items-center gap-1 justify-center hover:text-red-500 text-red-400 cursor-pointer"
                >
                  

                  <Trash2 width={16} />
                  Delete
                 
                </button>
              </div>
              
            )}
            {!isOwnComment && (
              <div className="hidden md:block">

                <ReplyButton
                  onClick={() => setShowReplyInput(!showReplyInput)}
                  isEditing={isEditing}
                  setIsEditing={setIsEditing}
                />
              </div>
            )}
          </div>
          )
          }

          {/* Show ReplyInput in edit mode */}
          {isEditing ? (
         
               <ReplyInput
    mode="edit"
    initialValue={comment.content} // prefill textarea
    commentId={comment.id}        // pass comment id for update
    onFinish={() => setIsEditing(false)} // close input after update
  />
            
          ) : (
            <p className="mt-2 text-gray-700">
              {comment.replyingTo && (
                <span className="text-blue-600 font-bold mr-1">
                  @{comment.replyingTo}
                </span>
              )}
              {comment.content}
            </p>
          )}
        </div>
       <div className="block sm:hidden flex items-center justify-between mt-2">
  <VoteBox commentId={comment.id} />
  {!isOwnComment && (
    <ReplyButton
      onClick={() => setShowReplyInput(!showReplyInput)}
      isEditing={isEditing}
      setIsEditing={setIsEditing}
    />
  )}
</div>
      </div>

      {/* Reply Input */}
      {showReplyInput && (
        <div className="mt-4">
          <ReplyInput mode="reply" parentId={comment.id} />
        </div>
      )}
    </div>
  );
};

export default CommentBox
