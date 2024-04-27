const knex = require("../../database/connection");

const updateUser = async (id, data) => {
  const response = await knex("users")
    .update(data)
    .where({ id })
    .returning(["id", "name", "email"]);

  return response[0];
};

module.exports = updateUser;
