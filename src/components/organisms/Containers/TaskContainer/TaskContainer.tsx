import { useParams } from "react-router-dom";

import TaskFilterBar from "../../TaskFilters/TaskFilterBar";
import TaskList from "../../Lists/TaskList/TaskList";
import TaskCreator from "../../TaskCreator/TaskCreator";
import { useTodos } from "lib/todos";
import { useLists } from "lib/lists";

const TaskContainer = () => {
  const params = useParams();

  const { getInbox, isLoading: isLoadingLists } = useLists();

  const listId = params.listId ?? getInbox?.listId;

  const enabled = !isLoadingLists && !!listId;

  const { isLoading } = useTodos({
    filters: { listId },
    enabled,
  });

  return (
    <main className="w-full mr-[0px]">
      <TaskCreator isLoading={isLoading} listId={listId} />
      <TaskFilterBar filters={{ listId }} enabled={enabled} />
      <TaskList filters={{ listId }} enabled={enabled} />
    </main>
  );
};

export default TaskContainer;
