import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "store/hooks";

import { Formik, Form, Field, ErrorMessage } from "formik";

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
            <Field
              id="email"
              type="email"
              name="email"
              className="bg-transparent border-b p-2 text-lg  font-medium border-main-300 focus:outline-none text-slate-100"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-pink-400 mt-1 font-light text-sm"
            />
            <S.Label htmlFor="password">Password:</S.Label>

            <Field
              type="password"
              name="password"
              id="password"
              className="bg-transparent border-b p-2 text-lg font-medium border-main-300 focus:outline-none text-slate-100"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="text-pink-400 mt-1 font-light text-sm"
            />
            <S.SubmitButton type="submit">Submit</S.SubmitButton>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
