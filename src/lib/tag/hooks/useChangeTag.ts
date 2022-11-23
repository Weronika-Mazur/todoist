import { useMutation, useQueryClient } from "react-query";
import { useAppDispatch } from "store/hooks";

import { AppsQueryKeys } from "utils/constants";
import { tagApi } from "../tagAPI/tagAPI";
import { Tag, TagContent } from "types/tag";
import { ErrorMessage } from "types/type";
import { setErrorMessage } from "features/app/appSlice";

interface ChangeTagProps {
  tagId: string;
  changes: TagContent;
}

const changeTagFn = async ({ tagId, changes }: ChangeTagProps) => {
  const returnedTag = await tagApi.updateTag(tagId, changes);

  if (!returnedTag) {
    throw Error("Couldn't edit tag");
  }

  return returnedTag;
};

export const useChangeTag = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  const changeTag = useMutation<Tag, ErrorMessage, ChangeTagProps>({
    mutationFn: changeTagFn,
    onSuccess: (data: Tag) => {
      const currentTagsArray: Tag[] | undefined = queryClient.getQueryData(
        AppsQueryKeys.tags
      );

      if (!currentTagsArray) throw new Error("No querry found");

      const newTagsArray = currentTagsArray.map((tag) =>
        tag.tagId === data.tagId ? data : tag
      );

      queryClient.setQueryData(AppsQueryKeys.tags, newTagsArray);
    },
    retry: false,
    onError: (err: any) => {
      const error = err.message || err;
      const errorMessage = `updating tag. ${error}`;
      dispatch(setErrorMessage(errorMessage));
    },
  });

  return {
    changeTag: changeTag.mutate,
    isChangingTag: changeTag.isLoading,
  };
};
