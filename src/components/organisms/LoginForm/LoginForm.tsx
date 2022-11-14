import { useNavigate } from "react-router-dom";

import { Formik, Form } from "formik";

import { loginSchema } from "utils/schemas";
import { useLogin } from "lib/auth";

import { LoginFormValues } from "types/type";
import * as S from "./styles";

const LoginForm = () => {
  const navigate = useNavigate();
  const initialValues: LoginFormValues = { email: "", password: "" };

  const { login } = useLogin();

  const handleSubmit = async (values: LoginFormValues) => {
    login(values, {
      onSuccess: () => {
        navigate("/");
      },
    });
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={loginSchema}
        onSubmit={handleSubmit}
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
