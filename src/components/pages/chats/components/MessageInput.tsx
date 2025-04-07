import React from "react";

interface MessageInputProps {
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  onSend: () => void;
}

const MessageInput: React.FC<MessageInputProps> = ({
  message,
  setMessage,
  onSend,
}) => {
  return (
    <div className="p-4 border-t flex">
      <input
        className="flex-1 p-2 border rounded"
        type="text"
        value={message}
        onChange={e => setMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <button
        className="ml-2 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={onSend}
      >
        Send
      </button>
    </div>
  );
};

export default MessageInput;
