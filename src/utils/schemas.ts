import { object, string } from "yup";

export const schema = object().shape({
  email: string().required("Email is required").email("Invalid email"),
  password: string().required("Password is required"),
}); //wywalic do osobnego pliku i olderu np utils, mozna rodzielic schema email, passsword i potem z tego zrobic schema login
