import * as yup from "yup";

const MIN_PASSWORD_LENGTH = 8;

export const checkPasswordAndEmailSchema = yup
  .object()
  .shape({
    email: yup.string().required("email is a required field").email(),
    password: yup
      .string()
      .required("password is a required field")
      .matches(
        new RegExp("(?=.*[0-9])(?=.*[!@#$%^&*()_+=])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*()_+=]{" + MIN_PASSWORD_LENGTH + ",}", "g"),
        "password incorrect"
      ),
  })
  .required();
