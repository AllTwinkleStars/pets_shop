// const clothesOperations = require("../../models/clothes");
// const { uploadToCloudinary } = require("../../service/upload.service");
// const { ErrorHandler } = require("../../utils/errorHandler");
// const { bufferToDataURI } = require("../../utils/file");
// const createError = require("http-errors");
const { Cloth } = require("../../models");

const add = async (req, res) => {

  const { _id } = req.admin;
  const result = await Cloth.create({ ...req.body, owner: _id });
  res.status(201).json({
    status: "success",
    code: 201,
    data: { result },
  });
};
module.exports = add;
