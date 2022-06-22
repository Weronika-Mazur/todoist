import { useParams } from "react-router-dom";
import { useLayoutEffect } from "react";
import { useAppDispatch, useAppSelector } from "store/hooks";

import { selectIsLoading } from "features/todo/todoSlice";
import { changeActiveListID, selectInbox } from "features/list/listSlice";

import TaskFilterBar from "../../TaskFilters/TaskFilterBar";
import TaskList from "../../Lists/TaskList/TaskList";
import TaskCreator from "../../TaskCreator/TaskCreator";

const TaskContainer = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const isLoading = useAppSelector(selectIsLoading);

  const { listId: inboxId } = useAppSelector(selectInbox);

  const listId = params.listId ?? inboxId;

  useLayoutEffect(() => {
    dispatch(changeActiveListID(listId));
  }, [dispatch, listId]);

  return (
    <main className="w-full mr-[0px]">
      <TaskCreator />
      <TaskFilterBar filters={{ listId }} />
      {!isLoading && <TaskList />}
    </main>
  );
};

export default TaskContainer;
