import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "store/hooks";

import { Formik, Form, Field, ErrorMessage } from "formik";

import { RegisterFormValues } from "types/type";
import { register, setIsSubmitted } from "features/user/userSlice";
import { selectIsSubmitted } from "features/user/userSlice";
import * as S from "./styles";
import { registerSchema } from "utils/schemas";

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const initialValues: RegisterFormValues = {
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
  };

  const isSubmitted = useAppSelector(selectIsSubmitted);

  useEffect(() => {
    if (isSubmitted) {
      dispatch(setIsSubmitted(false));
      navigate("/");
    }
  }, [isSubmitted, dispatch, navigate]);

  const onSubmit = (values: RegisterFormValues) => {
    const newUser = {
      username: values.username,
      email: values.email,
      password: values.password,
    };
    dispatch(register(newUser));
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={registerSchema}
        onSubmit={onSubmit}
      >
        {() => (
          <Form className="flex gap-1 flex-col mt-2">
            <S.Label htmlFor="username">Username:</S.Label>
            <Field
              id="username"
              type="text"
              name="username"
              maxLength={50}
              className="bg-transparent border-b p-2 text-lg  font-medium border-main-300 focus:outline-none text-slate-100"
            />
            <ErrorMessage
              name="username"
              component="div"
              className="text-pink-400 mt-1 font-light text-sm"
            />

            <S.Label htmlFor="email">Email:</S.Label>
            <Field
              id="email"
              type="email"
              name="email"
              maxLength={100}
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
            <S.Label htmlFor="repeatPassword">Repeat password:</S.Label>

            <Field
              type="password"
              name="repeatPassword"
              id="repeatPassword"
              className="bg-transparent border-b p-2 text-lg font-medium border-main-300 focus:outline-none text-slate-100"
            />
            <ErrorMessage
              name="repeatPassword"
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
