import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "store/hooks";

import { resetTodo } from "features/todo/todoSlice";
import { resetList } from "features/list/listSlice";
import { resetUser } from "features/user/userSlice";

import UserIcon from "assets/UserIcon";
import { selectEmail } from "features/user/userSlice";
import * as S from "./styles";
import MenuIcon from "assets/MenuIcon";

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

  const handleMenu = () => {
    handleToggleSideBar();
  };

  return (
    <S.Bar>
      <S.LogoContainer>
        <S.MenuButton onClick={handleMenu}>
          <MenuIcon className="fill-main-100 w-5 h-5 ml-3" />
        </S.MenuButton>
        <S.Logo>TODO</S.Logo>
      </S.LogoContainer>
      <S.NavContainer>
        <S.UserName>{username}</S.UserName>
        <UserIcon className={"w-7 h-7 mr-3 fill-main-700"} />
        <S.LogOutButton onClick={handleLogOut}>Log out</S.LogOutButton>
      </S.NavContainer>
    </S.Bar>
  );
};

export default NavBar;
