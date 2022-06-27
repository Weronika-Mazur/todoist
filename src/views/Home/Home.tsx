import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { useAppDispatch } from "store/hooks";

import { fetchListArray } from "features/list/listSlice";
import { setEmail, setUserName } from "features/user/userSlice";
import { fetchTags } from "features/tag/tagSlice";

import NavBar from "components/organisms/NavBar/NavBar";
import SideBar from "components/organisms/SideBar/SideBar";
import Modals from "components/organisms/Modals/Modals";
import FilteredContainer from "components/organisms/Containers/FilteredContainer/FilteredContainer";
import CalendarContainer from "components/organisms/Containers/CalendarContainer/CalendarContainer";
import TagsContainer from "components/organisms/Containers/TagsContainer/TagsContainer";
import TaskContainer from "components/organisms/Containers/TaskContainer/TaskContainer";

import { getTodayString, getTomorrowString } from "utils/helpers";
import * as S from "./styles";

const Home = () => {
  const [isFetching, setIsFetching] = useState(true);
  const [sideBarVisible, setSideBarVisible] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleToggleSideBar = () => {
    setSideBarVisible(!sideBarVisible);
  };

  const tomorrowFilters = {
    date: getTomorrowString(),
  };

  const todayFilters = {
    date: getTodayString(),
  };

  useEffect(() => {
    setIsFetching(true);
    const token = localStorage.getItem("jwt");
    if (token) {
      const decoded: { userId: string; email: string; userName: string } =
        jwt_decode(token);
      dispatch(setUserName(decoded.userName));
      dispatch(setEmail(decoded.email));
      dispatch(fetchTags());

      dispatch(fetchListArray()).then(() => {
        setIsFetching(false);
      });
    } else {
      navigate("/login");
    }
    //eslint-disable-next-line
  }, []);

  return (
    <div className="w-full ">
      <NavBar handleToggleSideBar={handleToggleSideBar} />
      <div className="w-full mt-14 ">
        <SideBar isVisible={sideBarVisible} />
        {!isFetching && (
          <S.MainContainer $isVisible={sideBarVisible}>
            <Routes>
              <Route index element={<TaskContainer />} />
              <Route
                path="today"
                element={<FilteredContainer filters={todayFilters} />}
              />
              <Route
                path="tomorrow"
                element={<FilteredContainer filters={tomorrowFilters} />}
              />
              <Route path="filtered" element={<FilteredContainer />} />
              <Route path="calendar" element={<CalendarContainer />} />
              <Route path="tags-and-filters" element={<TagsContainer />} />
              <Route path=":listId" element={<TaskContainer />} />
            </Routes>
          </S.MainContainer>
        )}
      </div>
      <Modals />
    </div>
  );
};

export default Home;
