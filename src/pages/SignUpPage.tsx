import React, { useState } from "react";
import SignUp from "../components/pages/sign-up/SignUp";
import Loading from "../components/common/Loading";
import ErrorComponent from "../components/common/Error";
import { UsersService } from "../services/usersService";
import { ErrorType } from "./utils/types";
import { AuthResponse } from "../services/usersService";

interface SignUpResult {
  success: boolean;
  value?: AuthResponse;
  error: string | null;
  type: ErrorType;
}

const parseSignUpError = (err: unknown): SignUpResult => {
  if (err instanceof Error) {
    if (err.message.startsWith("Error 409")) {
      return {
        success: false,
        error: "Email is already taken",
        type: ErrorType.Email,
      };
    }
  }

  return {
    success: false,
    error: "Unknown error occurred",
    type: ErrorType.Unknown,
  };
};

const SignUpPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [pageError, setPageError] = useState<string | null>(null);

  const handleSignUp = async (
    email: string,
    password: string,
  ): Promise<SignUpResult> => {
    setIsLoading(true);
    setPageError(null);

    try {
      const result = await UsersService.signUp({ username: email, password });
      return {
        success: true,
        value: result,
        error: null,
        type: ErrorType.Success,
      };
    } catch (err) {
      console.error(err);

      const parsedError = parseSignUpError(err);

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

  return <SignUp handleSignUp={handleSignUp} />;
};

export default SignUpPage;
