const create = require("./createUser");

const findByEmail = require("./findByEmail");

const findAll = require("./findAll");

const findById = require("./findById");

const deleteById = require("./deleteById");

const updateById = require("./updateById");

const createAddress = require("./addressUser");

module.exports = {
  create,
  findByEmail,
  findAll,
  findById,
  deleteById,
  updateById,
  createAddress
};
