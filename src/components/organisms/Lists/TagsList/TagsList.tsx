import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "store/hooks";

import Button from "components/atoms/Button/Button";
import TagEdit from "components/molecules/TagEdit/TagEdit";
import BusyIcon from "assets/BusyIcon";

import * as S from "./styles";
import { TagContent } from "types/tag";
import { useAddTag, useDeleteTag, useTags } from "lib/tag";
import {
  activateTagEditMode,
  selectTagEditModeId,
} from "features/tag/tagSlice";

const TagsList = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const editModeId = useAppSelector(selectTagEditModeId);

  const { data: tagArray, isLoading } = useTags();
  const { addTag } = useAddTag();
  const { deleteTag } = useDeleteTag();

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

      addTag(newTag, {
        onSuccess: () => {
          setContent("");
        },
      });
    }
  };

  const handleEditTag = (id: string) => {
    dispatch(activateTagEditMode(id));
  };

  const handleDeleteTag = (id: string) => {
    deleteTag(id);
  };

  const handleFilterBy = (tag: string) => {
    const searchParams = new URLSearchParams({ tag });
    const url = `/home/filtered/?${searchParams}`;
    navigate(url);
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
        {tagArray?.map((tag) =>
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
