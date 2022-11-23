import { useParams } from "react-router-dom";

import TaskFilterBar from "../../TaskFilters/TaskFilterBar";
import TaskList from "../../Lists/TaskList/TaskList";
import TaskCreator from "../../TaskCreator/TaskCreator";
import { useTodos } from "lib/todos";
import { useLists } from "lib/lists";

const TaskContainer = () => {
  const params = useParams();

  const { getInbox } = useLists();

  const listId = params.listId ?? getInbox?.listId ?? "";

  const { isLoading } = useTodos({ filters: { listId } });

  return (
    <main className="w-full mr-[0px]">
      <TaskCreator isLoading={isLoading} />
      <TaskFilterBar filters={{ listId }} />
      <TaskList filters={{ listId }} />
    </main>
  );
};

export default TaskContainer;
