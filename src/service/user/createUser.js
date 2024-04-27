const { userSchema } = require("../../middleware/userValidation/validation");
const userModel = require("../../model/user");
const bcrypt = require("bcrypt");
const axios = require("axios");

const create = async (user) => {
  try {
    await userSchema.validate(user);
  } catch (error) {
    const errorMessage = error.errors.join(", ");
    const statusCode = 400;
    throw { statusCode, message: errorMessage };
  }

  const existUser = await userModel.findByEmail(user.email);
  if (existUser) {
    const statusCode = 409;
    throw { statusCode, message: "User already exists" };
  }

  const { cep: userCep, ...userWithoutCep } = user;
  const newPassword = await bcrypt.hash(user.password, 10);
  const newUser = { ...userWithoutCep, password: newPassword };

  const result = await userModel.create(newUser);

  const addressResponse = await axios.get(
    `https://viacep.com.br/ws/${user.cep}/json/`
  );

  if (addressResponse.data.erro) {
    throw { statusCode: 400, message: "CEP not found" };
  }

  const { cep, logradouro, bairro, localidade, uf } = addressResponse.data;

  const address = {
    cep,
    street: logradouro,
    district: bairro,
    city: localidade,
    state: uf,
    user_id: result.id,
  };

  await userModel.createAddress(address);

  return { ...result, address };
};

module.exports = create;
