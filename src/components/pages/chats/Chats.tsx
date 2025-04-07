import React, { useState, useContext } from "react";
import UsersList from "./components/UsersList";
import Messages from "./components/Messages";
import MessageInput from "./components/MessageInput";
import OptionalRender from "../../common/OptionalRender";
import { User } from "../../../services/usersService";
import { Message } from "../../../services/messagesService";
import { SocketContext, AuthContext } from "../../../context/contexts";

interface ChatsProps {
  users: User[];
  chatUsername: string | null;
  setChatUsername(username: string | null): void;
  messages?: Message[];
}

const Chats: React.FC<ChatsProps> = ({
  users,
  chatUsername,
  setChatUsername,
  messages,
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [message, setMessage] = useState("");

  const socket = useContext(SocketContext);
  const { isAuthorised, authEmail } = useContext(AuthContext);

  const handleSendMessage = () => {
    if (!message.trim() || !chatUsername) return;

    const newMessage = {
      sender: authEmail,
      recipient: chatUsername,
      text: message,
    };

    if (socket) {
      socket.emit("sendMessage", newMessage);
    }

    setMessage("");
  };

  const sidebarClasses = `
    fixed 
    inset-y-0 
    left-0 
    transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
    transition-transform 
    duration-300 
    sm:relative 
    sm:translate-x-0 
    sm:w-1/4
  `;

  const messagesSectionClasses = `
    flex 
    flex-col 
    flex-1 
    bg-gray-100 
    p-4 
    ${isSidebarOpen ? "hidden sm:flex" : "flex"}
  `;

  const isAnyChatOpened = Boolean(chatUsername) && isAuthorised;

  return (
    <div className="flex h-screen">
      <div className={sidebarClasses}>
        <UsersList
          users={users}
          chatUsername={chatUsername}
          setChatUsername={setChatUsername}
          onClose={() => setIsSidebarOpen(false)}
        />
      </div>

      <div className={messagesSectionClasses}>
        <button
          className="sm:hidden mb-2 bg-blue-500 text-white px-3 py-1 rounded"
          onClick={() => setIsSidebarOpen(true)}
        >
          Open Users
        </button>
        <OptionalRender condition={isAnyChatOpened}>
          <Messages messages={messages || []} />
          <MessageInput
            message={message}
            setMessage={setMessage}
            onSend={handleSendMessage}
          />
        </OptionalRender>
        <OptionalRender condition={!isAnyChatOpened}>
          <div className="flex justify-center items-center h-full w-full">
            <span className="text-gray-500">Please, select any chat</span>
          </div>
        </OptionalRender>
      </div>
    </div>
  );
};

export default Chats;
