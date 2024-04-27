const {
  updateUserSchema,
} = require("../../middleware/userValidation/validation");
const userModel = require("../../model/user");
const bcrypt = require("bcrypt");
const axios = require("axios");

const updateById = async (id, data) => {
  const { name, email, password } = data;

  try {
    await updateUserSchema.validate(data);
  } catch (error) {
    const errorMessage = error.errors.join(", ");
    const statusCode = 400;
    throw { statusCode, message: errorMessage };
  }

  if (!name && !email && !password && !data.cep) {
    const statusCode = 400;
    throw { statusCode, message: "Request body cannot be empty" };
  }

  if (isNaN(id)) {
    const statusCode = 400;
    throw { statusCode, message: "Invalid ID format" };
  }
  const checkUser = await userModel.findById(id);

  if (!checkUser) {
    const statusCode = 404;
    throw { statusCode, message: "User not found" };
  }

  if (password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    data.password = hashedPassword;
  }

  if (data.cep) {
    const addressResponse = await axios.get(
      `https://viacep.com.br/ws/${data.cep}/json/`
    );

    if (addressResponse.data.erro) {
      const statusCode = 400;
      throw { statusCode, message: "CEP not found" };
    }

    const { cep, logradouro, bairro, localidade, uf } = addressResponse.data;

    addressUpadate = {
      cep,
      street: logradouro,
      district: bairro,
      city: localidade,
      state: uf,
    };

    address = await userModel.updateAddress(id, addressUpadate);
  }

  const userUpdate = { name, email, password };

  const user = await userModel.updateUser(id, userUpdate);

  return { ...user, address }
};

module.exports = updateById;
