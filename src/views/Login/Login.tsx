import UserIcon from "assets/UserIcon";
import LoginForm from "components/organisms/LoginForm/LoginForm";
import * as S from "./styles";

const Login = () => {
  return (
    <S.LoginContainer>
      <S.LoginCard>
        <S.LoginHeader>
          <UserIcon className="fill-blue w-16 h-16" />
        </S.LoginHeader>

        <S.LoginTitle>Sign In</S.LoginTitle>
        <LoginForm />
        <S.SignUp>
          Don't have an account?
          <S.SignUpLink> Sign up</S.SignUpLink>
        </S.SignUp>
      </S.LoginCard>
    </S.LoginContainer>
  );
};

export default Login;
