const { userSchema } = require("../../middleware/userValidation/validation");
const userModel = require("../../model/user");
const bcrypt = require("bcrypt");

const create = async (user) => {
  try {
    await userSchema.validate(user);
  } catch (error) {
    const errorMessage = error.errors.join(", ");
    const statusCode = 400;
    throw { statusCode, message: errorMessage };
  }

  const existUser = await userModel.findByEmail(user.email);
  if (existUser) {
    const statusCode = 409;
    throw { statusCode, message: "User already exists" };
  }

  const newPassword = await bcrypt.hash(user.password, 10);
  const newUser = { ...user, password: newPassword };

  const result = await userModel.create(newUser);

  return result;
};

module.exports = create;
