const { ErrorHandler } = require("../../utils/errorHandler");
const { Cloth } = require("../../models");
const uploadImg = require("./uploadImg");
const { destroyToCloudinary } = require("../../service/upload.service");
const createError = require("http-errors");

const updateImg = async (req, res, next) => {
  try {
    const { file } = req;
    const { clothesId } = req.params;
    const image = await uploadImg(file);
    const result = await Cloth.findByIdAndUpdate(clothesId, { image });

    // const result = await Cloth.findOne({ _id: clothesId });
    if (!result) {
      throw createError(404, `Product with id=${clothesId} not found`);
    }

    await destroyToCloudinary(result.image.public_id);

    res.json({
      status: "success",
      code: 200,
    });
  } catch (error) {
    next(new ErrorHandler(error.statusCode || 500, error.message));
  }
};

module.exports = { updateImg };
