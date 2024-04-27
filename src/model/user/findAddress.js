const knex = require("../../database/connection");

const findAddress = async (id) => {
    const response = await knex("addresses")
        .where({ user_id: id })
        .first(["cep", "street", "district", "city", "state"]);

    return response;
};

module.exports = findAddress;
