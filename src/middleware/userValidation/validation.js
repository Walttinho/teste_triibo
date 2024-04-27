const yup = require("yup");

const userSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
  cep: yup
    .string()
    .length(8)
    .matches(/^\d{8}$/, "Invalid CEP format")
    .required("CEP is required"),
});

const updateUserSchema = yup.object().shape({
  name: yup.string(),
  email: yup.string().email("Invalid email"),
  password: yup.string(),
  cep: yup
    .string()
    .length(8)
    .matches(/^\d{8}$/, "Invalid CEP format"),
});

module.exports = { userSchema, updateUserSchema };
