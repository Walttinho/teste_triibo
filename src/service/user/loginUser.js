const userModel = require("../../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginUser = async (email, password) => {
  const user = await userModel.findByEmail(email);

  if (!user) {
    throw { statusCode: 401, message: "user or password is incorrect" };
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    throw { statusCode: 401, message: "user or password is incorrect" };
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
   const { password: userPassword, ...resultUser } = user;

  return { user: resultUser, token };
};

module.exports = loginUser;
