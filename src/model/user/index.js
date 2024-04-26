const create = require("./createUser");

const findByEmail = require("./findByEmail");

const findAll = require("./findAll");

const findById = require("./findById");

const deleteById = require("./deleteById");

const updateById = require("./updateById");


module.exports = {
    create,
    findByEmail,
    findAll,
    findById,
    deleteById,
    updateById
}