const knex = require("../../database/connection");

const findAll = async () => {
  const response = await knex("users").select("*");
  return response;
};

module.exports = findAll;
