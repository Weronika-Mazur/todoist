import { NavLink } from "react-router-dom";

import * as S from "./styles";
import DropDown from "components/molecules/DropDown/DropDown";
import AccountOptionsDropDown from "../DropDowns/AccountOptionsDropDown/AccountOptionsDropDown";
import { useUser } from "lib/auth";

interface NavBarProps {
  handleToggleSideBar: () => void;
}

const NavBar = ({ handleToggleSideBar }: NavBarProps) => {
  const { user } = useUser();

  return (
    <S.Bar>
      <S.LogoContainer>
        <S.MenuButton onClick={handleToggleSideBar}>
          <S.WhiteMenuIcon />
        </S.MenuButton>
        <NavLink to="/home/">
          <S.Logo>TODO</S.Logo>
        </NavLink>
      </S.LogoContainer>
      <S.NavContainer>
        <S.UserName>{user?.userName}</S.UserName>

        <S.DarkUserIcon />

        <DropDown dropDown={<AccountOptionsDropDown />} placement="left-start">
          <S.OptionsButton>
            <S.WhiteOptionsIcon />
          </S.OptionsButton>
        </DropDown>
      </S.NavContainer>
    </S.Bar>
  );
};

export default NavBar;
