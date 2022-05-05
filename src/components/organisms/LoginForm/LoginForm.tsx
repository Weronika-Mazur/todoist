import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "store/hooks";

import { Formik, Form } from "formik";

import { LoginFormValues } from "types/type";
import { login, setIsSubmitted } from "features/user/userSlice";
import { selectIsSubmitted } from "features/user/userSlice";
import * as S from "./styles";
import { loginSchema } from "utils/schemas";

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const initialValues: LoginFormValues = { email: "", password: "" };

  const isSubmitted = useAppSelector(selectIsSubmitted);

  useEffect(() => {
    if (isSubmitted) {
      dispatch(setIsSubmitted(false));
      navigate("/");
    }
  }, [isSubmitted, dispatch, navigate]);

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={loginSchema}
        onSubmit={(values) => {
          dispatch(login(values));
        }}
      >
        {() => (
          <Form className="flex gap-1 flex-col mt-2">
            <S.Label htmlFor="email">Email:</S.Label>
            <S.FormField id="email" type="email" name="email" />
            <S.FormErrorMessage name="email" component="div" />
            <S.Label htmlFor="password">Password:</S.Label>

            <S.FormField type="password" name="password" id="password" />
            <S.FormErrorMessage name="password" component="div" />
            <S.SubmitButton type="submit">Submit</S.SubmitButton>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
