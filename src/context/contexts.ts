import { createContext } from "react";
import { Socket } from "socket.io-client";

interface AuthContextType {
  isAuthorised: boolean;
  authEmail: string | null;
  signIn: (token: string) => void;
  signOut: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthorised: false,
  authEmail: null,
  signIn: () => {},
  signOut: () => {},
});

export const SocketContext = createContext<Socket | null>(null);
