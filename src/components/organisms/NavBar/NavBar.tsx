import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "store/hooks";

import { resetTodo } from "features/todo/todoSlice";
import { resetList } from "features/list/listSlice";
import { resetUser } from "features/user/userSlice";

import { selectEmail } from "features/user/userSlice";
import * as S from "./styles";

interface NavBarProps {
  handleToggleSideBar: () => void;
}

const NavBar = ({ handleToggleSideBar }: NavBarProps) => {
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
      <S.LogoContainer>
        <S.MenuButton onClick={handleToggleSideBar}>
          <S.WhiteMenuIcon />
        </S.MenuButton>
        <S.Logo>TODO</S.Logo>
      </S.LogoContainer>
      <S.NavContainer>
        <S.UserName>{username}</S.UserName>
        <S.DarkUserIcon />
        <S.LogOutButton onClick={handleLogOut}>Log out</S.LogOutButton>
      </S.NavContainer>
    </S.Bar>
  );
};

export default NavBar;
