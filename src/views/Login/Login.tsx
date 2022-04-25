import { Link } from "react-router-dom";

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
          <Link
            to="/register"
            className="text-slate-100 cursor-pointer font-bold"
          >
            {" "}
            Sign up
          </Link>
        </S.SignUp>
      </S.LoginCard>
    </S.LoginContainer>
  );
};

export default Login;
