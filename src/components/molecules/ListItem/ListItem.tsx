import DotIcon from "assets/DotIcon";
import ListTitle from "components/atoms/ListTitle/ListTitle";
import ActiveCount from "components/atoms/ActiveCount/ActiveCount";
import { Container } from "./styles";

interface ListItemProps {
  name: string;
  color: number;
  id: string;
  number?: number;
}

const ListItem = ({ name, color, id, number }: ListItemProps) => {
  return (
    <li className="mt-2 flex items-center">
      <Container $color={color}>
        <DotIcon />
      </Container>
      <ListTitle listId={id} text={name} />
      <ActiveCount count={number} />
    </li>
  );
};

export default ListItem;
