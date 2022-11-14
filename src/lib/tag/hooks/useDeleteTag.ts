import { useMutation, useQueryClient } from "react-query";
import { useAppDispatch } from "store/hooks";

import { AppsQueryKeys } from "utils/constants";
import { tagApi } from "../tagAPI/tagAPI";
import { Tag } from "types/tag";
import { ErrorMessage } from "types/type";
import { setErrorMessage } from "features/app/appSlice";

const deleteTagFn = async (tagId: string) => {
  const returnedTag = await tagApi.deleteTag(tagId);

  if (!returnedTag) {
    throw Error("Couldn't delete task");
  }

  return returnedTag;
};

export const useDeleteTag = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  const deleteTag = useMutation<Tag, ErrorMessage, string>({
    mutationFn: deleteTagFn,
    onSuccess: (data: Tag) => {
      const currentTagsArray: Tag[] | undefined = queryClient.getQueryData(
        AppsQueryKeys.tags
      );

      if (!currentTagsArray) throw new Error("No querry found");

      const newTagsArray = currentTagsArray.filter(
        (tag) => tag.tagId !== data.tagId
      );

      queryClient.setQueryData(AppsQueryKeys.tags, newTagsArray);
    },
    retry: false,
    onError: (err: any) => {
      const error = err.message || err;
      const errorMessage = `deleting tag. ${error}`;
      dispatch(setErrorMessage(errorMessage));
    },
  });

  return {
    deleteTag: deleteTag.mutate,
    isDeletingTag: deleteTag.isLoading,
  };
};
