const yup = require("yup");

const userSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

const updateUserSchema = yup.object().shape({
  name: yup.string(),
  email: yup.string().email("Invalid email"),
  password: yup.string(),
});

module.exports = { userSchema, updateUserSchema };
