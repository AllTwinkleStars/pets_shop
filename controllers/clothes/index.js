const getPage = require("./getPage");
const getById = require("./getById");
const add = require("./add");
const updateById = require("./updateById");
const removeById = require("./removeById");
const updateStatusById = require("./updateStatusById");
const addFiles = require("./addFiles");
const updateDiscountById = require("./updateDiscountById");
const getAll = require("./getAll");
const sendMail = require("./sendMail");
const getFilter = require("./filter/getFilter");

module.exports = {
  updateDiscountById,
  getPage,
  add,
  getById,
  updateById,
  removeById,
  updateStatusById,
  addFiles,
  getAll,
  sendMail,
  getFilter,
};
