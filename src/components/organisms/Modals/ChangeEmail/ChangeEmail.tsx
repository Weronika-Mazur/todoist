import { useAppDispatch } from "store/hooks";

import { Formik, Form } from "formik";

import Button from "components/atoms/Button/Button";
import Field from "components/molecules/Field/Field";

import * as S from "./styles";
import { setShowModal } from "features/app/appSlice";
import { ChangeEmailValues } from "types/type";
import { changeEmailSchema } from "utils/schemas";
import { useChangeEmail } from "lib/auth";
import { memo } from "react";

const FormButton = memo(Button);

const ChangeEmail = () => {
  const dispatch = useAppDispatch();
  const initialValues: ChangeEmailValues = {
    email: "",
    repeatEmail: "",
    password: "",
  };

  const { changeEmail } = useChangeEmail();

  const handleSubmit = async (values: ChangeEmailValues) => {
    const data = { email: values.email, password: values.password };
    changeEmail(data, {
      onSuccess: () => {
        dispatch(setShowModal());
      },
    });
  };

  const handleCloseModal = () => {
    dispatch(setShowModal());
  };

  return (
    <S.Backdrop>
      <S.Card>
        <S.Title>Change email</S.Title>
        <Formik
          initialValues={initialValues}
          validationSchema={changeEmailSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form>
              <section className="flex gap-1 flex-col py-4 px-8 ">
                <Field
                  type="text"
                  name="email"
                  label="New email:"
                  maxLength={200}
                />
                <Field
                  type="text"
                  name="repeatEmail"
                  label="Repeat new email:"
                  maxLength={200}
                />
                <Field type="password" name="password" label="Password:" />
              </section>
              <S.ButtonContainer>
                <FormButton text="confirm" type="submit" />
                <FormButton
                  variant="outlined"
                  text="cancel"
                  type="button"
                  onClick={handleCloseModal}
                />
              </S.ButtonContainer>
            </Form>
          )}
        </Formik>
      </S.Card>
    </S.Backdrop>
  );
};

export default ChangeEmail;
