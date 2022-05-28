import { useState } from "react";
import { useAppDispatch, useAppSelector } from "store/hooks";

import {
  activateTagEditMode,
  addTag,
  deleteTag,
  selectIsLoading,
  selectTagArray,
  selectTagEditModeId,
} from "features/tag/tagSlice";
import { fetchFilteredTaskArray } from "features/todo/todoSlice";

import Button from "components/atoms/Button/Button";
import TagEdit from "components/molecules/TagEdit/TagEdit";
import BusyIcon from "assets/BusyIcon";
import * as S from "./styles";

import { TagContent } from "types/type";
import { setActiveListID } from "features/list/listSlice";

const TagsList = () => {
  const dispatch = useAppDispatch();

  const tagArray = useAppSelector(selectTagArray);
  const isLoading = useAppSelector(selectIsLoading);
  const editModeId = useAppSelector(selectTagEditModeId);

  const [content, setContent] = useState("");

  function isEditModeActive(tagId: string): boolean {
    return tagId === editModeId;
  }

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setContent(e.target.value);

  const handleAddTag = async () => {
    if (content !== "") {
      const newTag: TagContent = {
        content: content.trim(),
      };

      const data = await dispatch(addTag(newTag));
      if (data) {
        setContent("");
      }
    }
  };

  const handleEditTag = (id: string) => {
    dispatch(activateTagEditMode(id));
  };

  const handleDeleteTag = (id: string) => {
    dispatch(deleteTag(id));
  };

  const handleFilterBy = (tag: string) => {
    dispatch(fetchFilteredTaskArray(undefined, { tag }));
    dispatch(setActiveListID("Filtered"));
  };

  return (
    <section>
      <S.TagsHeader>Tags</S.TagsHeader>

      {!isLoading ? (
        <S.TagCreatorContainer>
          <Button onClick={handleAddTag} text="add"></Button>
          <S.TagCreatorInput
            type="text"
            placeholder="Create a new tag..."
            maxLength={50}
            value={content}
            onChange={handleTextChange}
          />
        </S.TagCreatorContainer>
      ) : (
        <S.BusyAnimation>
          <BusyIcon />
        </S.BusyAnimation>
      )}

      <S.TagList>
        {Array.from(tagArray).map((tag) =>
          !isEditModeActive(tag.tagId) ? (
            <S.ListItem key={tag.tagId}>
              <S.TaskTagIcon />
              <S.ListItemText onClick={() => handleFilterBy(tag.tagId)}>
                {tag.content}
              </S.ListItemText>
              <S.EditButton onClick={() => handleEditTag(tag.tagId)}>
                <S.GreyEditIcon />
              </S.EditButton>
              <S.CrossButton onClick={() => handleDeleteTag(tag.tagId)}>
                <S.GreyCrossIcon />
              </S.CrossButton>
            </S.ListItem>
          ) : (
            <TagEdit key={tag.tagId} id={tag.tagId} content={tag.content} />
          )
        )}
      </S.TagList>
    </section>
  );
};

export default TagsList;
