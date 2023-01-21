const validation = require("./validation");
const ctrlWrapper = require("./ctrlWrapper");
const authAdmin = require("./authAdmin");
const auth = require("./user");
const { upload } = require("./upload");

module.exports = { validation, ctrlWrapper, authAdmin, auth, upload };
