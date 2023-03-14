const getAll = require("./getAll");
const getById = require("./getById");
const add = require("./add");
const updateById = require("./updateById");
const removeById = require("./removeById");
const updateStatusById = require("./updateStatusById");
const addFiles = require("./addFiles");
const updateDiscountById = require("./updateDiscountById");

module.exports = {
  updateDiscountById,
  getAll,
  add,
  getById,
  updateById,
  removeById,
  updateStatusById,
  addFiles,
};
