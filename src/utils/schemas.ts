import { object, string, ref } from "yup";

export const email = {
  email: string()
    .required("Email is required")
    .email("Invalid email")
    .max(100, "Too long"),
};

const password = {
  password: string()
    .required("Password is required")
    .min(5, "Password must be minimum 5 characters long"),
};

export const loginSchema = object().shape({
  ...email,
  ...password,
});

export const changePasswordSchema = object().shape({
  newPassword: string()
    .required("Password is required")
    .min(5, "Password must be minimum 5 characters long"),
  repeatNewPassword: string()
    .required("Repeat new password")
    .oneOf([ref("newPassword"), null], "Passwords don't match"),
  ...password,
});
export const changeEmailSchema = object().shape({
  ...email,
  repeatEmail: string()
    .required("Repeat email")
    .oneOf([ref("email"), null], "Emails don't match"),
  ...password,
});

export const registerSchema = object().shape({
  ...email,
  ...password,
  username: string()
    .required("Username is required")
    .min(3, "Username must be minimum 3 characters long")
    .max(50, "Too long"),
  repeatPassword: string()
    .required("Repeat the password")
    .oneOf([ref("password"), null], "Passwords don't match"),
});
