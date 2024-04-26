const knex = require("../../database/connection");

const findById = async (id) => {
  const response = await knex("users")
    .where({ id })
    .first(["id", "name", "email"]);

  return response;
};

module.exports = findById;
