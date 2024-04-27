const knex = require("../../database/connection");

const createAddress = async (address) => {
  const response = await knex("addresses")
 .insert(address)
 .returning(["id", "cep", "street", "district", "city", "state", "user_id"]);

  return response[0];
};

module.exports = createAddress;
