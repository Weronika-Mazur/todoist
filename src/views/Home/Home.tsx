import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

import { useAppDispatch } from "store/hooks";

import NavBar from "components/organisms/NavBar/NavBar";
import TaskContainer from "components/organisms/TaskContainer/TaskContainer";
import SideBar from "components/organisms/SideBar/SideBar";
import { fetchListArray } from "features/list/listSlice";
import { setEmail, setUserName } from "features/user/userSlice";
import Modals from "components/organisms/Modals/Modals";
import * as S from "./styles";

const Home = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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
      dispatch(setUserName(decoded.userName));
      dispatch(setEmail(decoded.email));
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate]);

  return (
    <div className="w-full ">
      <NavBar handleToggleSideBar={handleToggleSideBar} />
      <div className="w-full mt-14 ">
        <SideBar isVisible={sideBarVisible} />
        <S.MainContainer $isVisible={sideBarVisible}>
          <TaskContainer />
        </S.MainContainer>
      </div>
      <Modals />
    </div>
  );
};

export default Home;
