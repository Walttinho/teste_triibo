const userModel = require("../../model/user");

const findById = async (id) => {
  if (isNaN(id)) {
    const statusCode = 400;
    throw { statusCode, message: "Invalid ID format" };
  }

  const user = await userModel.findById(id);

  const address = await userModel.findAddress(id);

  if (!user) {
    const statusCode = 404;
    throw { statusCode, message: "User not found" };
  }

  const response = { ...user, address };

  return response;
};

module.exports = findById;
