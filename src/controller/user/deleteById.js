const userService = require("../../service/user");

const deleteById = async (req, res) => {
  const { id } = req.params;

  try {
    await userService.deleteById(id);

    return res.sendStatus(204);
  } catch (error) {
    console.log("console error: ", error);
    if (error.statusCode) {
      return res.status(error.statusCode).json({ message: error.message });
    } else {
      return res.status(500).json({ error: error.message });
    }
  }
};

module.exports = deleteById;
