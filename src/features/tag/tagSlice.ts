import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "store/store";
import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";

import { tagApi } from "services/tagAPI";
import { Tag, TagContent } from "types/type";
import { setErrorMessage } from "features/todo/todoSlice";

interface State {
  tagArray: Tag[];
  isLoading: boolean;
}

const initialState: State = {
  tagArray: [],
  isLoading: false,
};

export const tagSlice = createSlice({
  name: "tag",
  initialState,
  reducers: {
    setTagArray: (state: State, action: PayloadAction<Tag[]>) => {
      state.tagArray = action.payload;
    },
    setIsLoading: (state: State, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    resetTag: () => initialState,
  },
});

export const selectTagArray = (state: RootState): Tag[] => {
  return state.tag.tagArray;
};

export const selectIsLoading = (state: RootState): boolean => {
  return state.tag.isLoading;
};

type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>;

type TagsAppThunk = AppThunk<Promise<Tag[] | undefined>>;
type TagAppThunk = AppThunk<Promise<Tag | undefined>>;

export const fetchTags = (): TagsAppThunk => {
  return async (dispatch, getState) => {
    try {
      dispatch(setIsLoading(true));

      const data = await tagApi.getTags();

      if (!data) {
        throw Error("Couldn't get tasks");
      }

      dispatch(setTagArray(data));
      dispatch(setErrorMessage(""));

      return data;
    } catch (err: any) {
      const errorMessage = `trying to get tags. ${err.message}`;
      dispatch(setErrorMessage(errorMessage));
    } finally {
      dispatch(setIsLoading(false));
    }
  };
};

export const addTag = (newTag: TagContent): TagAppThunk => {
  return async (dispatch, getState) => {
    try {
      dispatch(setIsLoading(true));

      const returnedTag = await tagApi.addTag(newTag);

      if (!returnedTag) {
        throw Error("Couldn't add task");
      }

      const currentTagArray: Tag[] = getState().tag.tagArray;

      dispatch(setTagArray([...currentTagArray, returnedTag]));

      dispatch(setErrorMessage(""));

      return returnedTag;
    } catch (err: any) {
      const errorMessage = `adding the tag. ${err.message}`;
      dispatch(setErrorMessage(errorMessage));
    } finally {
      dispatch(setIsLoading(false));
    }
  };
};

export const { setTagArray, resetTag, setIsLoading } = tagSlice.actions;

export default tagSlice.reducer;
