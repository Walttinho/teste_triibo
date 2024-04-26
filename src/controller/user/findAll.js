const userService = require("../../service/user");

const findAll = async (req, res) => {
  try {
    const response = await userService.findAll();
    return res.status(200).json(response);
  } catch (error) {
    if (error.statusCode) {
      return res.status(error.statusCode).json({ message: error.message });
    } else {
      return res.status(500).json({ error: error.message });
    }
  }
};

module.exports = findAll;
