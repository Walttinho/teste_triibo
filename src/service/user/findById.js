const userModel = require("../../model/user");

const findById = async (id) => {
 
    if (isNaN(id)) {
      const statusCode = 400;
      throw { statusCode, message: "Invalid ID format" };
    }

    const response = await userModel.findById(id);

    if (!response) {
      const statusCode = 404;
    throw { statusCode, message: "User not found" };
      };
    

    return response;
  
};

module.exports = findById;
