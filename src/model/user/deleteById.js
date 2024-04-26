const knex = require("../../database/connection");

const deleteById = async (id) => {
  await knex("users").where({ id }).del();
  return;
};

module.exports = deleteById;
