const knex = require("../../database/connection");

const updateAddress = async (id, address) => {
   
  const response = await knex("addresses").update(address).where({ user_id: id }).returning([
    "cep",
    "street",
    "district",
    "city",
    "state",
  ]);

  return response[0];
};

module.exports = updateAddress;