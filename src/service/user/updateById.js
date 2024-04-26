const {
  updateUserSchema,
} = require("../../middleware/userValidation/validation");
const userModel = require("../../model/user");

const updateById = async (id, data) => {
  const { name, email, password } = data;

  try {
    await updateUserSchema.validate(data);
  } catch (error) {
    const errorMessage = error.errors.join(", ");
    const statusCode = 400;
    throw { statusCode, message: errorMessage };
  }

  if (!name && !email && !password) {
    const statusCode = 400;
    throw { statusCode, message: "Request body cannot be empty" };
  }

  if (isNaN(id)) {
    const statusCode = 400;
    throw { statusCode, message: "Invalid ID format" };
  }
  const checkUser = await userModel.findById(id);

  if (!checkUser) {
    const statusCode = 404;
    throw { statusCode, message: "User not found" };
  }

  const response = await userModel.updateById(id, data);
  return response;
};

module.exports = updateById;
