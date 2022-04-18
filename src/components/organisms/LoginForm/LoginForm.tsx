import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "store/hooks";

import { Formik, Form, Field, ErrorMessage } from "formik";
import { object, string } from "yup";

import { LoginFormValues } from "types/type";
import { login, setIsSubmitted } from "features/user/userSlice";
import { selectIsSubmitted } from "../../../features/user/userSlice";
import { Label, SubmitButton } from "./styles";

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const initialValues: LoginFormValues = { email: "", password: "" };

  const isSubmitted = useAppSelector(selectIsSubmitted);

  const schema = object().shape({
    email: string().required("Email is required").email("Invalid email"),
    password: string().required("Password is required"),
  });

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
        validationSchema={schema}
        onSubmit={(values) => {
          dispatch(login(values));
        }}
      >
        {() => (
          <Form className="flex gap-1 flex-col mt-2">
            <Label htmlFor="email">Email:</Label>
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
            <Label htmlFor="password">Password:</Label>

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
            <SubmitButton type="submit">Submit</SubmitButton>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
