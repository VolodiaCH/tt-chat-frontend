import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../../common/InputField";
import RedirectLink from "../../common/RedirectLink";
import { emailValidationRegExp } from "../../../utils/utils";
import { Path } from "../../../router/routes";
import { AuthContext } from "../../../context/contexts";
import { ErrorType } from "../../../pages/utils/types";
import { AuthResponse } from "../../../services/usersService";

interface FormErrors {
  email: string | null;
  password: string | null;
}

interface SignInProps {
  handleSignIn(
    email: string,
    password: string,
  ): Promise<{
    value?: AuthResponse;
    error: string | null;
    type: ErrorType;
  }>;
}

const SignIn: React.FC<SignInProps> = ({ handleSignIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<FormErrors | null>(null);

  const navigate = useNavigate();
  const { signIn } = useContext(AuthContext);

  const validateFields = (): FormErrors | null => {
    const emailError =
      email.length === 0
        ? "Email field can't be empty!"
        : !emailValidationRegExp.test(email)
          ? "Please, enter a real email!"
          : null;

    const passwordError =
      password.length === 0
        ? "Password field can't be empty!"
        : password.length < 4
          ? "Password should contain at least 4 symbols!"
          : null;

    return emailError || passwordError
      ? { email: emailError, password: passwordError }
      : null;
  };

  const submit = async () => {
    const validationErrors = validateFields();
    setErrors(validationErrors);

    if (validationErrors === null) {
      const result = await handleSignIn(email, password);

      if (
        result.type === ErrorType.Success &&
        typeof result.value?.access_token === "string"
      ) {
        signIn(result.value.access_token);
        navigate(Path.Chats);
      } else if (result.type === ErrorType.Password) {
        setErrors({ email: null, password: result.error });
      }
    }
  };

  return (
    <div className="flex justify-center items-start">
      <form
        className="container-box"
        onSubmit={e => {
          e.preventDefault();
          submit();
        }}
      >
        <h2 className="text-2xl font-bold text-center mb-4">Sign-In</h2>
        <div className="space-y-4">
          <InputField
            label="Email"
            name="email"
            type="text"
            value={email}
            onChange={e => setEmail(e.target.value.trim())}
            error={errors?.email}
          />
          <InputField
            label="Password"
            name="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value.trim())}
            error={errors?.password}
          />
        </div>
        <button className="btn-primary mt-4" type="submit">
          Submit
        </button>
        <RedirectLink
          text="Don't have an account? "
          href={Path.SignUp}
          linkText="Sign-Up"
        />
      </form>
    </div>
  );
};

export default SignIn;
