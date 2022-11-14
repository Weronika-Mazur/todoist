import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";

import { RegisterFormValues } from "types/type";
import * as S from "./styles";
import { registerSchema } from "utils/schemas";
import { useRegister } from "lib/auth";

const LoginForm = () => {
  const navigate = useNavigate();
  const initialValues: RegisterFormValues = {
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
  };

  const { register } = useRegister();

  const onSubmit = (values: RegisterFormValues) => {
    const newUser = {
      username: values.username,
      email: values.email,
      password: values.password,
    };

    register(newUser, {
      onSuccess: () => {
        navigate("/");
      },
    });
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
            <S.FormField
              id="username"
              type="text"
              name="username"
              maxLength={50}
            />
            <S.FormErrorMessage name="username" component="div" />

            <S.Label htmlFor="email">Email:</S.Label>
            <S.FormField id="email" type="email" name="email" maxLength={100} />
            <S.FormErrorMessage name="email" component="div" />
            <S.Label htmlFor="password">Password:</S.Label>

            <S.FormField type="password" name="password" id="password" />
            <S.FormErrorMessage name="password" component="div" />
            <S.Label htmlFor="repeatPassword">Repeat password:</S.Label>

            <S.FormField
              type="password"
              name="repeatPassword"
              id="repeatPassword"
            />
            <S.FormErrorMessage name="repeatPassword" component="div" />
            <S.SubmitButton type="submit">Submit</S.SubmitButton>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
