import ListItem from "components/molecules/ListItem/ListItem";
import { SideBarProps } from "types/type";

import * as S from "./styles";

interface SideBarItem {
  text: string;
  to: string;
  icon: React.ReactElement;
}

const ProfileSideBar = ({ isVisible }: SideBarProps) => {
  const sideBarLinks: SideBarItem[] = [
    {
      text: "Account",
      to: "/account/",
      icon: <S.DarkUserIcon />,
    },
    /*              todo               */

    // { text: "General", to: "/account/general", icon: <S.DarkCogIcon /> },
    // {
    //   text: "Reminders",
    //   to: "/account/reminders",
    //   icon: <S.DarkCalendarIcon />,
    // },
    // {
    //   text: "Notifications",
    //   to: "/account/notifications",
    //   icon: <S.DarkBellIcon />,
    // },
  ];

  return (
    <>
      <S.SideBarNav $isVisible={isVisible}>
        <S.SideBarContainer $isVisible={isVisible}>
          <S.List>
            {sideBarLinks.map((item: SideBarItem) => (
              <ListItem
                key={item.text}
                to={item.to}
                text={item.text}
                icon={item.icon}
              />
            ))}
          </S.List>
        </S.SideBarContainer>
      </S.SideBarNav>
    </>
  );
};

export default ProfileSideBar;
