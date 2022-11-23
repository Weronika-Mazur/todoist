import { NavLink } from "react-router-dom";

import ListTitle from "components/atoms/ListTitle/ListTitle";

import * as S from "./styles";

interface ListItemProps {
  text: string;
  to: string;
  children?: React.ReactElement;
  icon: React.ReactElement;
  onClick?: () => void;
  className?: string;
}

const ListItem = ({
  text,
  to,
  children,
  icon,
  onClick,
  className,
}: ListItemProps) => {
  return (
    <NavLink to={to}>
      {({ isActive }) => (
        <S.ListItemContainer $selected={isActive} className={className}>
          {icon}
          <S.TitleContainer>
            <ListTitle text={text} isActive={isActive} onClick={onClick} />
            {children}
          </S.TitleContainer>
        </S.ListItemContainer>
      )}
    </NavLink>
  );
};

export default ListItem;
