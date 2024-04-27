const knex = require("../../database/connection");

const findAll = async () => {
  const response = await knex("users")
    .join("addresses", "users.id", "addresses.user_id")
    .select([
      "users.id",
      "users.name",
      "users.email",
      "addresses.cep",
      "addresses.street",
      "addresses.district",
      "addresses.city",
      "addresses.state",
    ]); 

  return response;
};

module.exports = findAll;
