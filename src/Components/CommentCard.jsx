"use client";
import { useState } from "react";

const CommentCard = ({ comment, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);

  const handleSave = () => {
    if (editedContent.trim() === "") return;
    onUpdate(comment.id, editedContent);
    setIsEditing(false);
  };

  return (
    <div className="flex gap-2">
      {isEditing ? (
        <div className="flex flex-col gap-2 w-full">
          <textarea
            className="w-full border rounded-lg p-2 text-gray-700"
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          />
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="px-3 py-1 bg-green-600 text-white rounded"
            >
              Save
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setEditedContent(comment.content);
              }}
              className="px-3 py-1 bg-gray-400 text-white rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="flex gap-2">
          <button
            onClick={() => setIsEditing(true)}
            className="text-blue-600 font-semibold hover:underline"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(comment.id)}
            className="text-red-600 font-semibold hover:underline"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default CommentCard;
