import { useLists } from "lib/lists";
import { useParams } from "react-router-dom";

export const useGetListId = () => {
  const params = useParams();

  const { getInbox } = useLists();

  const listId = params.listId ?? getInbox?.listId;
  if (!listId) throw new Error("No listId found");

  return listId;
};
