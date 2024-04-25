const userService = require("../../service/user");

const findById = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await userService.findById(id);

    return res.status(200).json(response);
  } catch (error) {
    if (error.statusCode) {
      return res.status(error.statusCode).json({ message: error.message });
    } else {
      return res.status(500).json({ error: error.message });
    }
  }
};

module.exports = findById;
