import { useEffect, useRef, useState } from "react";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";

import * as S from "./styles";
import { Tag, TagContent } from "types/tag";
import { useAddTag, useTags } from "lib/tag";

interface TagDropDownDropDownProps {
  handleSetTaskTags: (newSet: Tag[]) => void;
  taskTags: Tag[];
}

const TagDropDown = ({
  handleSetTaskTags,
  taskTags,
}: TagDropDownDropDownProps) => {
  const { data: tagArray, isLoading } = useTags();
  const { addTag } = useAddTag();

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

      addTag(newTag, {
        onSuccess: () => {
          setText("");
        },
      });
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
          {tagArray?.map((tag) => (
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
