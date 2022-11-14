import * as S from "./styles";

interface FieldProps {
  name: string;
  type: string;
  label: string;
  maxLength?: number;
}

const Field = ({ name, type, label, maxLength }: FieldProps) => {
  return (
    <>
      <S.Label htmlFor={name}>{label}</S.Label>
      <S.InputContainer>
        <S.EditInput type={type} id={name} maxLength={maxLength} name={name} />
      </S.InputContainer>
      <S.FormErrorMessage name={name} component="div" />
    </>
  );
};

export default Field;
