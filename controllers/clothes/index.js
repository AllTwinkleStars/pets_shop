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
};
