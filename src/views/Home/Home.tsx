import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { useAppDispatch, useAppSelector } from "store/hooks";

import NavBar from "components/organisms/NavBar/NavBar";
import TaskContainer from "components/organisms/Containers/TaskContainer/TaskContainer";
import SideBar from "components/organisms/SideBar/SideBar";
import Modals from "components/organisms/Modals/Modals";
import CalendarContainer from "components/organisms/Containers/CalendarContainer/CalendarContainer";
import TagsContainer from "components/organisms/Containers/TagsContainer/TagsContainer";
import FilteredContainer from "components/organisms/Containers/FilteredContainer/TaskContainer";

import { fetchListArray, selectActiveListID } from "features/list/listSlice";
import { setEmail, setUserName } from "features/user/userSlice";
import { fetchTags } from "features/tag/tagSlice";

import * as S from "./styles";

const Home = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const selectedList = useAppSelector(selectActiveListID);

  const [sideBarVisible, setSideBarVisible] = useState(false);

  const handleToggleSideBar = () => {
    setSideBarVisible(!sideBarVisible);
  };

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      const decoded: { userId: string; email: string; userName: string } =
        jwt_decode(token);
      dispatch(fetchListArray());
      dispatch(fetchTags());
      dispatch(setUserName(decoded.userName));
      dispatch(setEmail(decoded.email));
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate]);

  const container = () => {
    switch (selectedList) {
      case "Filtered":
      case "Today":
      case "Tomorrow":
        return <FilteredContainer />;
      case "Calendar":
        return <CalendarContainer />;
      case "Tags and filters":
        return <TagsContainer />;
      default:
        return <TaskContainer />;
    }
  };

  return (
    <div className="w-full ">
      <NavBar handleToggleSideBar={handleToggleSideBar} />
      <div className="w-full mt-14 ">
        <SideBar isVisible={sideBarVisible} />
        <S.MainContainer $isVisible={sideBarVisible}>
          {container()}
        </S.MainContainer>
      </div>
      <Modals />
    </div>
  );
};

export default Home;
