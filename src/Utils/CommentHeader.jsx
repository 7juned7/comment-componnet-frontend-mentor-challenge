import Image from "next/image";

const CommentHeader = ({ avatar, username, time }) => {
  return (
    <div className="flex items-center gap-3">
      <Image
        src={avatar}
        alt={`${username} profile`}
        width={32}
        height={32}
        className="rounded-full"
       loading="lazy"
      />
      <span className="font-bold text-gray-800">{username}</span>
      <span className="text-gray-400 text-sm">{time}</span>
    </div>
  );
};

export default CommentHeader;
