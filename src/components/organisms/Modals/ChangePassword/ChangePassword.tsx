import { useAppDispatch } from "store/hooks";
import { memo } from "react";
import { Formik, Form } from "formik";

import Button from "components/atoms/Button/Button";
import Field from "components/molecules/Field/Field";

import * as S from "./styles";
import { setShowModal } from "features/app/appSlice";
import { ChangePasswordValues } from "types/type";
import { changePasswordSchema } from "utils/schemas";
import { useChangePassword } from "lib/auth";

const FormButton = memo(Button);

const ChangePassword = () => {
  const dispatch = useAppDispatch();
  const initialValues: ChangePasswordValues = {
    newPassword: "",
    repeatNewPassword: "",
    password: "",
  };

  const { changePassword } = useChangePassword();

  const handleSubmit = async (values: ChangePasswordValues) => {
    const data = { newPassword: values.newPassword, password: values.password };
    changePassword(data, {
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
        <S.Title>Change password</S.Title>
        <Formik
          initialValues={initialValues}
          validationSchema={changePasswordSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form>
              <section className="flex gap-1 flex-col py-4 px-8 ">
                <Field
                  type="password"
                  name="newPassword"
                  label="New password:"
                />
                <Field
                  type="password"
                  name="repeatNewPassword"
                  label="Repeat new password:"
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

export default ChangePassword;
