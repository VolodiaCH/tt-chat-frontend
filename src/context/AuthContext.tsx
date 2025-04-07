import React, { useState, useEffect } from "react";
import { AuthContext } from "./contexts";

interface JwtPayload {
  username: string;
}

const base64UrlToBase64 = (base64Url: string): string => {
  return base64Url.replace(/-/g, "+").replace(/_/g, "/");
};

const decodeJwt = (token: string): JwtPayload | null => {
  try {
    const payload = token.split(".")[1];
    const decodedPayload = JSON.parse(atob(base64UrlToBase64(payload)));
    return decodedPayload;
  } catch (error) {
    console.error("Error decoding JWT", error);
    return null;
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthorised, setIsAuthorised] = useState(false);
  const [authEmail, setAuthEmail] = useState<string | null>(null);

  const updateState = (email?: string) => {
    setIsAuthorised(true);
    if (email) setAuthEmail(email);
  };

  useEffect(() => {
    const token = sessionStorage.getItem("access_token");

    if (token) {
      const decoded = decodeJwt(token);

      if (decoded) {
        updateState(decoded.username);
      }
    }
  }, []);

  const signIn = (token: string) => {
    sessionStorage.setItem("access_token", token);

    const decoded = decodeJwt(token);

    if (decoded) {
      updateState(decoded.username);
    }
  };

  const signOut = () => {
    sessionStorage.removeItem("access_token");
    setIsAuthorised(false);
    setAuthEmail(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthorised, authEmail, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
