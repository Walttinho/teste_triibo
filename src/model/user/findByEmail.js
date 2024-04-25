const knex = require("../../database/connection");

const findByEmail = async (email) => {
  const response = await knex("users").where({ email }).first();

  return response;
};

module.exports = findByEmail;
