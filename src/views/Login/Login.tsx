import UserIcon from "assets/UserIcon";
import LoginForm from "components/organisms/LoginForm/LoginForm";
import {
  LoginCard,
  LoginContainer,
  LoginHeader,
  LoginTitle,
  SignUp,
  SignUpLink,
} from "./styles";

const Login = () => {
  return (
    <LoginContainer>
      <LoginCard>
        <LoginHeader>
          <UserIcon className="fill-blue w-16 h-16" />
        </LoginHeader>

        <LoginTitle>Sign In</LoginTitle>
        <LoginForm />
        <SignUp>
          Don't have an account?
          <SignUpLink> Sign up</SignUpLink>
        </SignUp>
      </LoginCard>
    </LoginContainer>
  );
};

export default Login;
