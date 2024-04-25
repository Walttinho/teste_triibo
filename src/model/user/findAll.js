const knex = require("../../database/connection");

const findAll = async () => {
  const response = await knex("users").select(["id", "name", "email"]);
  return response;
};

module.exports = findAll;
