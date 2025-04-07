import React from "react";
import OptionalRender from "../../../common/OptionalRender";

interface MessagesProps {
  messages: { sender: string; text: string }[];
}

const Messages: React.FC<MessagesProps> = ({ messages }) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 relative">
      <OptionalRender condition={messages.length === 0}>
        <div className="flex justify-center items-center h-full w-full">
          <span className="text-gray-500">There are no messages yet</span>
        </div>
      </OptionalRender>
      {messages.map((msg, index) => (
        <div key={index} className="mb-2">
          <span className="font-bold">{msg.sender}: </span>
          <span>{msg.text}</span>
        </div>
      ))}
    </div>
  );
};

export default Messages;
