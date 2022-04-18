import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "store/store";
import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";

import { todoApi } from "services/todoAPI";
import { Task, TaskContent, EditMode, Filter } from "types/type";
import { updateActiveCount } from "features/list/listSlice";

interface State {
  taskArray: Task[];
  taskFilter: Filter;
  isLoading: boolean;
  errorMessage: string;
  editMode: EditMode;
}

const initialState: State = {
  taskArray: [],
  taskFilter: "all",
  isLoading: true,
  errorMessage: "",
  editMode: {
    active: false,
    id: "",
  },
};

export const todoSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<Filter>) => {
      state.taskFilter = action.payload;
    },
    setTaskArray: (state, action: PayloadAction<Task[]>) => {
      state.taskArray = action.payload || [];
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setErrorMessage: (state, action: PayloadAction<string | undefined>) => {
      state.errorMessage = action.payload || "";
    },
    activateEditMode: (state, action: PayloadAction<string>) => {
      state.editMode = {
        active: true,
        id: action.payload,
      };
    },
    deactivateEditMode: (state) => {
      state.editMode = {
        active: false,
        id: "",
      };
    },
  },
});

// selectors

export const selectTaskArrayWithFilters = (state: RootState) => {
  return state.todo.taskFilter === "all"
    ? state.todo.taskArray
    : state.todo.taskArray.filter(
        (task: Task) => task.state === state.todo.taskFilter
      );
};

export const selectItemsCounter = (state: RootState): number => {
  return state.todo.taskArray.filter((task: Task) => task.state === "active")
    .length;
};

export const selectTaskFilter = (state: RootState): Filter => {
  return state.todo.taskFilter;
};

export const selectIsLoading = (state: RootState): boolean => {
  return state.todo.isLoading;
};

export const selectErrorMessage = (state: RootState): string => {
  return state.todo.errorMessage;
};

export const selectEditModeId = (state: RootState): string => {
  return state.todo.editMode.id;
};

// async

type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>;

type TodoAppThunk = AppThunk<Promise<Task[] | undefined>>;
type TaskAppThunk = AppThunk<Promise<Task | undefined>>;

export const fetchTaskArray = (): TodoAppThunk => {
  return async (dispatch, getState) => {
    try {
      dispatch(setIsLoading(true));
      const activeListID = getState().list.activeListID;
      const data = await todoApi.getTasks(activeListID);

      if (!data) {
        throw Error("Couldn't get tasks");
      }

      dispatch(setTaskArray(data));
      dispatch(setErrorMessage(""));

      return data;
    } catch (err) {
      dispatch(setErrorMessage("trying to get tasks"));
    } finally {
      dispatch(setIsLoading(false));
    }
  };
};

export const clearCompleted = (): TodoAppThunk => {
  return async (dispatch, getState) => {
    try {
      dispatch(setIsLoading(true));
      const activeListID = getState().list.activeListID;
      const data = await todoApi.clearCompleted(activeListID);

      if (!data) {
        throw Error("Couldn't clear tasks");
      }

      dispatch(fetchTaskArray());
      return data;
    } catch (err) {
      dispatch(setErrorMessage("trying to clear completed tasks"));
    } finally {
      dispatch(setIsLoading(false));
    }
  };
};

export const addTask = (newTask: TaskContent): TaskAppThunk => {
  return async (dispatch, getState) => {
    try {
      dispatch(setIsLoading(true));
      const activeListID = getState().list.activeListID;
      const returnedTask = await todoApi.addTask(activeListID, newTask);

      if (!returnedTask) {
        throw Error("Couldn't add task");
      }

      const currentTaskArray: Task[] = getState().todo.taskArray;

      dispatch(setTaskArray([...currentTaskArray, returnedTask]));

      dispatch(updateActiveCount(1));

      return returnedTask;
    } catch (err) {
      console.log(err);
      dispatch(setErrorMessage("adding the task"));
    } finally {
      dispatch(setIsLoading(false));
    }
  };
};

export const changeTask = (
  taskId: string,
  changes: TaskContent
): TaskAppThunk => {
  return async (dispatch, getState) => {
    try {
      dispatch(setIsLoading(true));
      const returnedTask = await todoApi.updateTask(taskId, changes);

      if (!returnedTask) {
        throw Error("Couldn't change task");
      }

      const currentTaskArray: Task[] = getState().todo.taskArray;

      dispatch(
        setTaskArray(
          currentTaskArray.map((task) =>
            task.taskId === returnedTask.taskId ? returnedTask : task
          )
        )
      );

      if (changes.state) {
        const amount = returnedTask.state === "active" ? 1 : -1;
        dispatch(updateActiveCount(amount));
      }
      return returnedTask;
    } catch (err) {
      dispatch(setErrorMessage("changing tasks state"));
    } finally {
      dispatch(setIsLoading(false));
    }
  };
};

export const deleteTask = (taskId: string): TaskAppThunk => {
  return async (dispatch, getState) => {
    try {
      dispatch(setIsLoading(true));
      const returnedTask = await todoApi.deleteTask(taskId);

      if (!returnedTask) {
        throw Error("Couldn't delete task");
      }

      const currentTaskArray: Task[] = getState().todo.taskArray;

      dispatch(
        setTaskArray(
          currentTaskArray.filter((task) => task.taskId !== returnedTask.taskId)
        )
      );

      if (returnedTask.state === "active") {
        dispatch(updateActiveCount(-1));
      }
      return returnedTask;
    } catch (err) {
      dispatch(setErrorMessage("deleting task"));
    } finally {
      dispatch(setIsLoading(false));
    }
  };
};

export const {
  setFilter,
  setTaskArray,
  setIsLoading,
  setErrorMessage,
  activateEditMode,
  deactivateEditMode,
} = todoSlice.actions;

export default todoSlice.reducer;
