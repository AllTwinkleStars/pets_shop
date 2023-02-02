// const clothesOperations = require("../../models/clothes");
// const { uploadToCloudinary } = require("../../service/upload.service");
// const { ErrorHandler } = require("../../utils/errorHandler");
// const { bufferToDataURI } = require("../../utils/file");
// const createError = require("http-errors");

const { ErrorHandler } = require("../../utils/errorHandler");
const { Cloth } = require("../../models");
const uploadImg = require("./uploadImg");
const createError = require("http-errors");

const add = async (req, res, next) => {
  try {
    const { file, body } = req;
    console.log(file);
    const { _id } = req.user;
    const { code: uniq } = body;
    // const image = await uploadImg(file);
    const clothes = await Cloth.findOne({ code: uniq });

    if (clothes) {
      throw createError(404, `Such a code already exists!`);
    }

    const result = await Cloth.create({
      ...body,
      image: await uploadImg(file),
      owner: _id,
    });

    res.json({
      status: "success",
      code: 201,
      data: result,
    });
  } catch (error) {
    next(new ErrorHandler(error.statusCode || 500, error.message));
  }
};

module.exports = add;

// const { Cloth } = require("../../models");

// const add = async (req, res) => {
//   const { _id } = req.admin;
//   const result = await Cloth.create({ ...req.body, owner: _id });
//   res.status(201).json({
//     status: "success",
//     code: 201,
//     data: { result },
//   });
// };
// module.exports = add;
