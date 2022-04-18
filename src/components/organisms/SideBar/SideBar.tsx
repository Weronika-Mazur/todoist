import { useAppSelector } from "store/hooks";
import { selectListArray } from "features/list/listSlice";

import Button from "../../atoms/Button/Button";
import ListItem from "../../molecules/ListItem/ListItem";
import PredefinedLists from "../PredefinedLists/PredefinedLists";
import {
  SideBarNav,
  SideBarContainer,
  ButtonContainer,
  UserList,
} from "./styles";

const SideBar = () => {
  const listArray = useAppSelector(selectListArray);

  return (
    <SideBarNav>
      <SideBarContainer>
        <PredefinedLists />
        <ButtonContainer>
          <Button onClick={() => {}} text="new list" />
        </ButtonContainer>
        <UserList>
          {listArray.map((list) => (
            <ListItem
              key={list.listId}
              id={String(list.listId)}
              name={list.name}
              color={list.color}
              number={list.activeCount}
            />
          ))}
        </UserList>
      </SideBarContainer>
    </SideBarNav>
  );
};

export default SideBar;
