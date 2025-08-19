import { MessageSquare, ReplyIcon } from "lucide-react";

const ReplyButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 cursor-pointer text-blue-800 hover:text-blue-700"
    >
      <ReplyIcon size={18} strokeWidth={2.5} />
      <span className="font-bold">Reply</span>
    </button>
  );
};

export default ReplyButton;
