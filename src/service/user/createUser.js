
const { userSchema } = require("../../middleware/userValidation/validation");
const userModel = require("../../model/user");

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

  const result = await userModel.create(user);

  return result;

};

module.exports = create;
