import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "store/store";
import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";

import { todoApi } from "services/todoAPI";
import { Task, TaskContent, EditMode, Filter, TaskFilters } from "types/type";
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
    setFilter: (state: State, action: PayloadAction<Filter>) => {
      state.taskFilter = action.payload;
    },
    setTaskArray: (state: State, action: PayloadAction<Task[]>) => {
      state.taskArray = action.payload || [];
    },
    setIsLoading: (state: State, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setErrorMessage: (
      state: State,
      action: PayloadAction<string | undefined>
    ) => {
      state.errorMessage = action.payload || "";
    },
    activateTaskEditMode: (state: State, action: PayloadAction<string>) => {
      state.editMode = {
        active: true,
        id: action.payload,
      };
    },
    deactivateTaskEditMode: (state: State) => {
      state.editMode = {
        active: false,
        id: "",
      };
    },
    resetTodo: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTaskArray.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchTaskArray.fulfilled, (state, action) => {
      state.taskArray = action.payload || [];
      state.isLoading = false;
    });
    builder.addCase(fetchTaskArray.rejected, (state, action) => {
      state.errorMessage = action.payload ?? "";
      state.taskArray = [];

      state.isLoading = false;
    });
  },
});

// selectors

export const selectTaskArrayWithFilters = (state: RootState) => {
  return state.todo.taskFilter === "all"
    ? state.todo.taskArray
    : state.todo.taskArray.filter(
        (task: Task) => task.status === state.todo.taskFilter
      );
};

export const selectItemsCounter = (state: RootState): number => {
  return state.todo.taskArray.filter((task: Task) => task.status === "active")
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

export const selectTaskEditModeId = (state: RootState): string => {
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

export const fetchTaskArray = createAsyncThunk<
  Task[],
  TaskFilters,
  { rejectValue: string }
>("todo/fetchTaskArray", async (filters: TaskFilters, { rejectWithValue }) => {
  try {
    const { listId, ...taskFilters } = filters;

    const data = await todoApi.getTasks(listId, taskFilters);

    if (!data) {
      throw Error("Couldn't get tasks");
    }

    return data;
  } catch (err: any) {
    const errorMessage = `trying to get tasks. ${err.message}`;
    return rejectWithValue(errorMessage);
  }
});

export const clearCompleted = (filters: TaskFilters): TodoAppThunk => {
  return async (dispatch, getState) => {
    try {
      dispatch(setIsLoading(true));
      const { listId, ...taskFilters } = filters;

      const deletedTaskArray = await todoApi.clearCompleted(
        listId,
        taskFilters
      );

      if (!deletedTaskArray) {
        throw Error("Couldn't clear tasks");
      }

      const currentTaskArray: Task[] = getState().todo.taskArray;

      if (deletedTaskArray.length === 0) {
        return deletedTaskArray;
      }

      const newTaskArray = currentTaskArray.filter(
        (task) =>
          !deletedTaskArray.find(
            (deletedTask) => deletedTask.taskId === task.taskId
          )
      );

      dispatch(setTaskArray(newTaskArray));
      return deletedTaskArray;
    } catch (err: any) {
      const errorMessage = `trying to clear completed tasks. ${err.message}`;
      dispatch(setErrorMessage(errorMessage));
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
    } catch (err: any) {
      const errorMessage = `adding the task. ${err.message}`;
      dispatch(setErrorMessage(errorMessage));
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

      if (changes.status) {
        const amount = returnedTask.status === "active" ? 1 : -1;
        dispatch(updateActiveCount(amount));
      }
      return returnedTask;
    } catch (err: any) {
      const errorMessage = `changing tasks status. ${err.message}`;
      dispatch(setErrorMessage(errorMessage));
    }
  };
};

export const editTask = (
  taskId: string,
  changes: TaskContent
): TaskAppThunk => {
  return async (dispatch, getState) => {
    try {
      const returnedTask = await todoApi.updateTask(taskId, changes);

      if (!returnedTask) {
        throw Error("Couldn't edit task");
      }

      const currentTaskArray: Task[] = getState().todo.taskArray;

      dispatch(
        setTaskArray(
          currentTaskArray.map((task) =>
            task.taskId === returnedTask.taskId ? returnedTask : task
          )
        )
      );

      dispatch(deactivateTaskEditMode());
      return returnedTask;
    } catch (err: any) {
      const errorMessage = `editing tasks. ${err.message}`;
      dispatch(setErrorMessage(errorMessage));
    }
  };
};

export const deleteTask = (taskId: string): TaskAppThunk => {
  return async (dispatch, getState) => {
    try {
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

      if (returnedTask.status === "active") {
        dispatch(updateActiveCount(-1));
      }
      return returnedTask;
    } catch (err: any) {
      const errorMessage = `deleting task. ${err.message}`;
      dispatch(setErrorMessage(errorMessage));
    }
  };
};

export const {
  setFilter,
  setTaskArray,
  setIsLoading,
  setErrorMessage,
  activateTaskEditMode,
  deactivateTaskEditMode,
  resetTodo,
} = todoSlice.actions;

export default todoSlice.reducer;
