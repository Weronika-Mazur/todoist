import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "store/store";
import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";

import { tagApi } from "services/tagAPI";
import { Tag, TagContent, EditMode } from "types/type";
import { setErrorMessage } from "features/todo/todoSlice";

interface State {
  tagArray: Tag[];
  isLoading: boolean;
  editMode: EditMode;
}

const initialState: State = {
  tagArray: [],
  isLoading: false,
  editMode: {
    active: false,
    id: "",
  },
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
    activateTagEditMode: (state: State, action: PayloadAction<string>) => {
      state.editMode = {
        active: true,
        id: action.payload,
      };
    },
    deactivateTagEditMode: (state: State) => {
      state.editMode = {
        active: false,
        id: "",
      };
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

export const selectTagEditModeId = (state: RootState): string => {
  return state.tag.editMode.id;
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

      return returnedTag;
    } catch (err: any) {
      const errorMessage = `adding the tag. ${err.message}`;
      dispatch(setErrorMessage(errorMessage));
    } finally {
      dispatch(setIsLoading(false));
    }
  };
};

export const deleteTag = (tagId: string): TagAppThunk => {
  return async (dispatch, getState) => {
    try {
      dispatch(setIsLoading(true));

      const returnedTag = await tagApi.deleteTag(tagId);

      if (!returnedTag) {
        throw Error("Couldn't delete task");
      }

      const currentTagArray: Tag[] = getState().tag.tagArray;
      const newTagArray = currentTagArray.filter(
        (tag) => tag.tagId !== returnedTag.tagId
      );

      dispatch(setTagArray(newTagArray));

      return returnedTag;
    } catch (err: any) {
      const errorMessage = `deleting tag. ${err.message}`;
      dispatch(setErrorMessage(errorMessage));
    } finally {
      dispatch(setIsLoading(false));
    }
  };
};

export const editTag = (tagId: string, changes: TagContent): TagAppThunk => {
  return async (dispatch, getState) => {
    try {
      const returnedTag = await tagApi.updateTag(tagId, changes);

      if (!returnedTag) {
        throw Error("Couldn't edit tag");
      }

      const currentTagArray: Tag[] = getState().tag.tagArray;
      const newTagArray = currentTagArray.map((tag) =>
        tag.tagId === returnedTag.tagId ? returnedTag : tag
      );

      dispatch(setTagArray(newTagArray));

      dispatch(deactivateTagEditMode());
      return returnedTag;
    } catch (err: any) {
      const errorMessage = `editing tasks. ${err.message}`;
      dispatch(setErrorMessage(errorMessage));
    }
  };
};

export const {
  setTagArray,
  resetTag,
  setIsLoading,
  activateTagEditMode,
  deactivateTagEditMode,
} = tagSlice.actions;

export default tagSlice.reducer;
