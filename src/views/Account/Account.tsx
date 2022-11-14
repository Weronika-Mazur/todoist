import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import ProfileSideBar from "components/organisms/ProfileSideBar/ProfileSideBar";
import MainLayout from "layouts/MainLayout";

import * as S from "./styles";
import { useUser } from "lib/auth";

const Account = () => {
  const navigate = useNavigate();

  const { user, isLoading } = useUser();

  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/login");
    }

    //eslint-disable-next-line
  }, []);
  return (
    <MainLayout SideBar={ProfileSideBar}>
      <S.SettingsContainer>
        <Outlet />
      </S.SettingsContainer>
    </MainLayout>
  );
};

export default Account;
