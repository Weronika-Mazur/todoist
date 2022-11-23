import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import SideBar from "components/organisms/SideBar/SideBar";
import MainLayout from "layouts/MainLayout";

import { useUser } from "lib/auth/";

const Home = () => {
  const navigate = useNavigate();

  const { user, isLoading } = useUser();

  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/login");
    }

    //eslint-disable-next-line
  }, [isLoading, user]);

  return !isLoading ? (
    <MainLayout SideBar={SideBar}>{<Outlet />}</MainLayout>
  ) : null;
};

export default Home;
