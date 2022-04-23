import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "store/hooks";

import { resetTodo } from "features/todo/todoSlice";
import { resetList } from "features/list/listSlice";
import { resetUser } from "features/user/userSlice";

import UserIcon from "assets/UserIcon";
import { selectEmail } from "features/user/userSlice";
import * as S from "./styles";

const NavBar = () => {
  const username = useAppSelector(selectEmail);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function handleLogOut() {
    localStorage.removeItem("jwt");
    dispatch(resetTodo());
    dispatch(resetUser());
    dispatch(resetList());

    navigate("/login");
  }

  return (
    <S.Bar>
      <S.Logo>TODO</S.Logo>
      <S.NavContainer>
        <S.UserName>{username}</S.UserName>
        <UserIcon className={"w-7 h-7 mr-3 fill-main-700"} />
        <S.LogOutButton onClick={handleLogOut}>Log out</S.LogOutButton>
      </S.NavContainer>
    </S.Bar>
  );
};

export default NavBar;
