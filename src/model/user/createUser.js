const knex = require("../../database/connection");

const create = async (user) => {
  try {
    const response = await knex("users")
      .insert(user)
      .returning(["id", "name", "email"]);

    if (response.length === 0) {
      throw new Error("User not created");
    }

    return response[0];
  } catch (error) {
    throw new Error("Error creating user: " + error.message);
  }
};

module.exports = create;
