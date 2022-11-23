import { useState } from "react";

import { useAppDispatch } from "store/hooks";
import disableScroll from "disable-scroll";

import * as S from "./styles";
import { deactivateTagEditMode } from "features/tag/tagSlice";
import { useChangeTag } from "lib/tag";

interface TagEditProps {
  content: string;
  id: string;
}

const TagEdit = ({ content, id }: TagEditProps) => {
  const dispatch = useAppDispatch();
  const [text, setText] = useState(content);
  const { changeTag } = useChangeTag();

  const handleEndEditing = () => {
    text !== content &&
      changeTag(
        {
          tagId: id,
          changes: {
            content: text,
          },
        },
        {
          onSuccess: () => {
            dispatch(deactivateTagEditMode());
          },
        }
      );

    disableScroll.off();
  };

  const handleCancelEdit = () => {
    dispatch(deactivateTagEditMode());
    disableScroll.off();
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setText(e.target.value);

  disableScroll.on();

  return (
    <>
      <S.Backdrop
        onClick={handleEndEditing}
        data-testid="tagedit-backdrop"
      ></S.Backdrop>
      <S.EditContainer>
        <S.EditInput
          type="text"
          value={text}
          maxLength={50}
          onChange={handleTextChange}
          autoFocus
        />
        <button onClick={handleCancelEdit}>
          <S.GreyCrossIcon />
        </button>
      </S.EditContainer>
    </>
  );
};

export default TagEdit;
