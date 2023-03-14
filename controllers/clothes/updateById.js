const createError = require("http-errors");
const { ErrorHandler } = require("../../utils/errorHandler");
const { Cloth } = require("../../models");
const uploadImg = require("./uploadImg");
const { destroyToCloudinary } = require("../../service/upload.service");

const updateById = async (req, res, next) => {
  try {
    const { clothesId } = req.params;
    const { file, body } = req;

    const imageDestroy = await Cloth.findOne({ clothesId });
    await destroyToCloudinary(imageDestroy.image.public_id);
    const image = await uploadImg(file);
    const result = await Cloth.findByIdAndUpdate(
      clothesId,
      { ...body, image },
      {
        new: true,
      }
    );
    if (!result) {
      throw createError(404, `Product with id=${clothesId} not found`);
    }

    res.json({
      status: "success",
      code: 200,
      data: { result },
    });
  } catch (error) {
    next(new ErrorHandler(error.statusCode || 500, error.message));
  }
};
module.exports = updateById;
