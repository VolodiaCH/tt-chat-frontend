import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Chats from "../components/pages/chats/Chats";
import Loading from "../components/common/Loading";
import Error from "../components/common/Error";
import { User, UsersService } from "../services/usersService";
import { MessageService, Message } from "../services/messagesService";
import { SocketContext, AuthContext } from "../context/contexts";
import { Path } from "../router/routes";

const ChatsPage: React.FC = () => {
  const [users, setUsers] = useState<User[] | undefined>(undefined);
  const [messages, setMessages] = useState<Message[] | undefined>(undefined);
  const [chatUsername, setChatUsername] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const socket = useContext(SocketContext);
  const { authEmail, isAuthorised } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!authEmail || !isAuthorised) navigate(Path.SignIn);

  useEffect(() => {
    const getUsersData = async () => {
      setIsLoading(true);
      try {
        const data = await UsersService.getAll();
        setUsers(data);
      } catch (err: unknown) {
        setError(`${err}`);
      } finally {
        setIsLoading(false);
      }
    };

    if (!users) getUsersData();
  }, [users]);

  useEffect(() => {
    if (chatUsername) {
      const getMessagesWithUser = async () => {
        setIsLoading(true);
        try {
          const data = await MessageService.getMessagesWithUser(chatUsername);
          setMessages(data);
        } catch (err: unknown) {
          setError(`${err}`);
        } finally {
          setIsLoading(false);
        }
      };

      getMessagesWithUser();
    }
  }, [chatUsername]);

  useEffect(() => {
    if (socket) {
      socket.on("message", (newMessage: Message) => {
        if (
          (newMessage.sender === authEmail &&
            newMessage.recipient === chatUsername) ||
          (newMessage.sender === chatUsername &&
            newMessage.recipient === authEmail)
        ) {
          setMessages(prevMessages => [...(prevMessages || []), newMessage]);
        }
      });
    }

    return () => {
      if (socket) {
        socket.off("message");
      }
    };
  }, [authEmail, socket, chatUsername]);

  if (isLoading || !users) return <Loading />;
  if (error) return <Error message={error} />;

  return (
    <Chats
      users={users}
      chatUsername={chatUsername}
      setChatUsername={setChatUsername}
      messages={messages}
    />
  );
};

export default ChatsPage;
