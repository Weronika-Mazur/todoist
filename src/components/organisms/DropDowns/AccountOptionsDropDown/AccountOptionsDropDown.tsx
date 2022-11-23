import { NavLink, useNavigate } from "react-router-dom";

import * as S from "./styles";
import { useLogout } from "lib/auth";

const AccountOptionsDropDown = () => {
  const navigate = useNavigate();
  const { logout } = useLogout();

  function handleLogOut() {
    logout();

    navigate("/login");
  }
  return (
    <>
      <NavLink to="/account/">
        <S.ListItem>
          <S.ListCogIcon />
          <S.ListItemText>Settings</S.ListItemText>
        </S.ListItem>
      </NavLink>
      <S.ListItem onClick={handleLogOut}>
        <S.ListLogoutIcon />
        <S.ListItemText>Logout</S.ListItemText>
      </S.ListItem>
    </>
  );
};

export default AccountOptionsDropDown;
