const userService = require("../../service/user");

const updateById = async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;

  try {
    const response = await userService.updateById(id, {
      name,
      email,
      password,
    });
    res.status(200).json(response);
  } catch (error) {
    if (error.statusCode) {
      return res.status(error.statusCode).json({ message: error.message });
    } else {
      return res.status(500).json({ error: error.message });
    }
  }
};

module.exports = updateById;
