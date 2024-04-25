const userModel = require("../../model/user");

const deleteById = async (id) => {
  
  if (isNaN(id)) {
    const statusCode = 400;
    throw { statusCode, message: "Invalid ID format" };
  }
  const checkUser = await userModel.findById(id);

  if (!checkUser) {
    const statusCode = 404;
    throw { statusCode, message: "User not found" };
  }

  const response = await userModel.deleteById(id);
  return response;
};

module.exports = deleteById;
