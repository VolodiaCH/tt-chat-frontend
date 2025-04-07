import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../../common/InputField";
import RedirectLink from "../../common/RedirectLink";
import { emailValidationRegExp } from "../../../utils/utils";
import { Path } from "../../../router/routes";
import { AuthContext } from "../../../context/contexts";
import { AuthResponse } from "../../../services/usersService";
import { ErrorType } from "../../../pages/utils/types";

interface SignUpProps {
  handleSignUp(
    email: string,
    password: string,
  ): Promise<{
    value?: AuthResponse;
    error: string | null;
    type: ErrorType;
  }>;
}

interface FormErrors {
  email: string | null;
  password: string | null;
  repeatPassword: string | null;
}

const SignUp: React.FC<SignUpProps> = ({ handleSignUp }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [errors, setErrors] = useState<FormErrors | null>(null);

  const navigate = useNavigate();
  const { signIn } = useContext(AuthContext);

  const submit = async () => {
    const validationErrors = validateFields();

    setErrors(validationErrors);

    if (validationErrors === null) {
      const result = await handleSignUp(email, password);

      if (
        result.type === ErrorType.Success &&
        typeof result.value?.access_token === "string"
      ) {
        signIn(result.value.access_token);
        navigate(Path.Chats);
      } else if (result.error) {
        setErrors({
          email: result.error,
          password: null,
          repeatPassword: null,
        });
      }
    }
  };

  const validateFields = () => {
    let emailError = null,
      passwordError = null,
      repeatPasswordError = null;

    if (!emailValidationRegExp.test(email))
      emailError = "Please, enter a valid email!";
    if (email.length === 0) emailError = "Email field can't be empty!";
    if (password.length === 0) passwordError = "Password field can't be empty!";
    if (password !== repeatPassword)
      repeatPasswordError = "Passwords don't match!";

    if (emailError || passwordError || repeatPasswordError) {
      return {
        email: emailError,
        password: passwordError,
        repeatPassword: repeatPasswordError,
      };
    }

    return null;
  };

  return (
    <div className="flex justify-center items-start">
      <div className="container-box">
        <h2 className="text-2xl font-bold text-center mb-4">Sign-Up</h2>
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
          <InputField
            label="Repeat Password"
            name="repeat-password"
            type="password"
            value={repeatPassword}
            onChange={e => setRepeatPassword(e.target.value.trim())}
            error={errors?.repeatPassword}
          />
        </div>
        <button className="btn-primary" onClick={submit}>
          Submit
        </button>

        <RedirectLink
          text="Already have an account? "
          href={Path.SignIn}
          linkText="Sign-In"
        />
      </div>
    </div>
  );
};

export default SignUp;
