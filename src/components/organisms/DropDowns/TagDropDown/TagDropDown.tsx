import { useAppDispatch, useAppSelector } from "store/hooks";
import { useEffect, useRef, useState } from "react";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";

import * as S from "./styles";
import { selectTagArray, selectIsLoading, addTag } from "features/tag/tagSlice";
import { Tag, TagContent } from "types/type";

interface TagDropDownDropDownProps {
  handleSetTaskTags: (newSet: Tag[]) => void;
  taskTags: Tag[];
}

const TagDropDown = ({
  handleSetTaskTags,
  taskTags,
}: TagDropDownDropDownProps) => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectIsLoading);
  const tagArray = useAppSelector(selectTagArray);

  const [text, setText] = useState("");
  const targetRef = useRef();

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setText(e.target.value);

  const hasTag = (tag: Tag) =>
    taskTags.find((element) => tag.tagId === element.tagId);

  const handleToggleTag = (tag: Tag) => {
    hasTag(tag)
      ? handleSetTaskTags(taskTags.filter((item) => item.tagId !== tag.tagId))
      : handleSetTaskTags([...taskTags, tag]);
  };

  const handleAddTag = async () => {
    if (text !== "") {
      const newTag: TagContent = {
        content: text.trim(),
      };

      const data = await dispatch(addTag(newTag));
      if (data) {
        setText("");
      }
    }
  };

  useEffect(() => {
    const targetElement = targetRef.current;
    disableBodyScroll(targetElement!);
    return () => {
      enableBodyScroll(targetElement!);
    };
  }, []);

  return (
    <>
      <S.InputListItem onClick={handleClick}>
        {!isLoading ? (
          <>
            <S.TagInput
              type="text"
              placeholder="Enter a new tag..."
              maxLength={60}
              value={text}
              onChange={handleTextChange}
            />
            <S.TagAddButton onClick={handleAddTag}>
              <S.TagPlusIcon />
            </S.TagAddButton>
          </>
        ) : (
          <S.BusyAnimation>
            <S.TagBusyIcon />
          </S.BusyAnimation>
        )}
      </S.InputListItem>

      <S.TagsListItem onClick={handleClick}>
        <S.TagList ref={targetRef}>
          {Array.from(tagArray).map((tag) => (
            <S.TagItem onClick={() => handleToggleTag(tag)} key={tag.tagId}>
              <S.TagLabel>{tag.content}</S.TagLabel>
              <S.Checkmark $isChecked={hasTag(tag)}>
                <S.Checked $isChecked={hasTag(tag)} />
              </S.Checkmark>
            </S.TagItem>
          ))}
        </S.TagList>
      </S.TagsListItem>
    </>
  );
};

export default TagDropDown;
