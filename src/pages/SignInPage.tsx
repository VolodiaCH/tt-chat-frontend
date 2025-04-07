import React, { useState } from "react";
import { UsersService } from "../services/usersService";
import Loading from "../components/common/Loading";
import ErrorComponent from "../components/common/Error";
import SignIn from "../components/pages/sign-in/SignIn";
import { ErrorType } from "./utils/types";
import { AuthResponse } from "../services/usersService";

interface SignInResult {
  success: boolean;
  value?: AuthResponse;
  error: string | null;
  type: ErrorType;
}

const parseSignInError = (err: unknown): SignInResult => {
  if (err instanceof Error) {
    if (err.message.startsWith("Error 401")) {
      return {
        success: false,
        error: "Wrong password",
        type: ErrorType.Password,
      };
    }
  }

  return {
    success: false,
    error: "Unknown error occurred",
    type: ErrorType.Unknown,
  };
};

const SignInPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [pageError, setPageError] = useState<string | null>(null);

  const handleSignIn = async (
    email: string,
    password: string,
  ): Promise<SignInResult> => {
    setIsLoading(true);
    setPageError(null);

    try {
      const result = await UsersService.signIn({ username: email, password });

      return {
        success: true,
        value: result,
        error: null,
        type: ErrorType.Success,
      };
    } catch (err) {
      console.error(err);

      const parsedError = parseSignInError(err);

      if (parsedError.type === ErrorType.Unknown) {
        setPageError(parsedError.error);
      }

      return parsedError;
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <Loading />;
  if (pageError) return <ErrorComponent message={pageError} />;

  return <SignIn handleSignIn={handleSignIn} />;
};

export default SignInPage;
