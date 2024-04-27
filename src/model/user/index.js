const create = require("./createUser");

const findByEmail = require("./findByEmail");

const findAll = require("./findAll");

const findById = require("./findById");

const deleteById = require("./deleteById");

const updateUser = require("./updateUser");

const createAddress = require("./addressUser");

const findAddress = require("./findAddress");

const updateAddress = require("./updateAddress");

module.exports = {
  create,
  findByEmail,
  findAll,
  findById,
  deleteById,
  updateUser,
  createAddress,
  findAddress,
  updateAddress,
};
