import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "store/hooks";

import { setTaskArray } from "features/todo/todoSlice";
import { setListArray, setInbox } from "features/list/listSlice";
import { setUserName } from "features/user/userSlice";

import UserIcon from "assets/UserIcon";
import { selectEmail } from "../../../features/user/userSlice";
import { Bar, Logo, LogOutButton, NavContainer, UserName } from "./styles";

const NavBar = () => {
  const username = useAppSelector(selectEmail);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function handleLogOut() {
    localStorage.removeItem("jwt");
    dispatch(setTaskArray([]));
    dispatch(setUserName(""));
    dispatch(setListArray([]));
    dispatch(
      setInbox({
        listId: "",
        name: "Inbox",
        owner: "",
        color: 1,
        activeCount: 0,
      })
    );

    navigate("/login");
  }

  return (
    <Bar>
      <Logo>TODO</Logo>
      <NavContainer>
        <UserName>{username}</UserName>
        <UserIcon className={"w-7 h-7 mr-3 fill-main-700"} />
        <LogOutButton onClick={handleLogOut}>Log out</LogOutButton>
      </NavContainer>
    </Bar>
  );
};

export default NavBar;
