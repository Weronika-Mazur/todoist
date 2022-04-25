import { Link } from "react-router-dom";

import UserIcon from "assets/UserIcon";
import RegisterForm from "components/organisms/RegisterForm/RegisterForm";
import * as S from "../Login/styles";

const Register = () => {
  return (
    <S.LoginContainer>
      <S.LoginCard>
        <S.LoginHeader>
          <UserIcon className="fill-blue w-16 h-16" />
        </S.LoginHeader>

        <S.LoginTitle>Sign Up</S.LoginTitle>
        <RegisterForm />
        <S.SignUp>
          Already have an account?
          <Link to="/login" className="text-slate-100 cursor-pointer font-bold">
            {" "}
            Login
          </Link>
        </S.SignUp>
      </S.LoginCard>
    </S.LoginContainer>
  );
};

export default Register;
