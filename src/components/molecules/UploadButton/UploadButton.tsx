import * as S from "./styles";

interface EditButtonProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  name: string;
}

const UploadButton = ({ onChange, className, name }: EditButtonProps) => {
  return (
    <S.EditButton className={className}>
      <S.ButtonEditIcon />
      edit
      <input
        type="file"
        onChange={onChange}
        accept="image/png, image/jpeg"
        name={name}
        style={{ display: "none" }}
      />
    </S.EditButton>
  );
};

export default UploadButton;
