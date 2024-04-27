const userModel = require("../../model/user");

const findAll = async () => {
  const response = await userModel.findAll();

  if (response.length === 0) {
    throw new Error("Users not found");
  }

  const result = response.map((user) => {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      address: {
        cep: user.cep,
        street: user.street,
        district: user.district,
        city: user.city,
        state: user.state,
      },
    };
  });

  return result;
};

module.exports = findAll;
