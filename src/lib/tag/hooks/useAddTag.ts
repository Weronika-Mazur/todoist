import { useMutation, useQueryClient } from "react-query";
import { useAppDispatch } from "store/hooks";

import { AppsQueryKeys } from "utils/constants";
import { tagApi } from "../tagAPI/tagAPI";
import { Tag, TagContent } from "types/tag";
import { ErrorMessage } from "types/type";
import { setErrorMessage } from "features/app/appSlice";

const addTagFn = async (newTag: TagContent) => {
  const returnedTag = await tagApi.addTag(newTag);

  if (!returnedTag) {
    throw Error("Couldn't add task");
  }

  return returnedTag;
};

export const useAddTag = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  const addTag = useMutation<Tag, ErrorMessage, TagContent>({
    mutationFn: addTagFn,
    onSuccess: (data: Tag) => {
      const currentTagsArray: Tag[] | undefined = queryClient.getQueryData(
        AppsQueryKeys.tags
      );

      if (!currentTagsArray) throw new Error("No querry found");

      const newTagsArray = [...currentTagsArray, data];

      queryClient.setQueryData(AppsQueryKeys.tags, newTagsArray);
    },
    retry: false,
    onError: (err: any) => {
      const error = err.message || err;
      const errorMessage = `adding tag. ${error}`;
      dispatch(setErrorMessage(errorMessage));
    },
  });

  return {
    addTag: addTag.mutate,
    isAddingTag: addTag.isLoading,
  };
};
