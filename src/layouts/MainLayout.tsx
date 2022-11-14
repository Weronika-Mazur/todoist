import { useState } from "react";

import NavBar from "components/organisms/NavBar/NavBar";
import Modals from "components/organisms/Modals/Modals";

import * as S from "./styles";
import { SideBarProps } from "types/type";
import { useLists } from "lib/lists";

interface MainLayoutProps {
  SideBar: React.ComponentType<SideBarProps>;
  children: React.ReactElement | null;
}

const MainLayout = ({ SideBar, children }: MainLayoutProps) => {
  const [sideBarVisible, setSideBarVisible] = useState(false);

  const { isLoading } = useLists();

  const handleToggleSideBar = () => {
    setSideBarVisible(!sideBarVisible);
  };

  return (
    <div className="w-full ">
      <NavBar handleToggleSideBar={handleToggleSideBar} />
      <div className="w-full mt-14 ">
        <SideBar isVisible={sideBarVisible} />
        {!isLoading && (
          <S.MainContainer $isVisible={sideBarVisible}>
            {children}
          </S.MainContainer>
        )}
      </div>
      <Modals />
    </div>
  );
};

export default MainLayout;
