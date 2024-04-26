const loginUserService = require("../../service/user/loginUser");

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const { user, token } = await loginUserService(email, password);
    res.status(200).json({ user, token });
  } catch (error) {
    if (error.statusCode) {
      return res.status(error.statusCode).json({ message: error.message });
    } else {
      return res.status(500).json({ error: error.message });
    }
  }
};

module.exports = loginUser;
