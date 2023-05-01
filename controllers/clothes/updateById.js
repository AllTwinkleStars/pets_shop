const createError = require("http-errors");
const { ErrorHandler } = require("../../utils/errorHandler");
const { Cloth } = require("../../models");
const uploadImg = require("./uploadImg");
const { destroyToCloudinary } = require("../../service/upload.service");

const updateById = async (req, res, next) => {
  try {
    const { clothesId } = req.params;
    const { files, body } = req;

    const imageDestroy = await Cloth.findById(clothesId);
    for (const item of imageDestroy.image) {
      await destroyToCloudinary(item.public_id);
    }

    const array = [];
    // await destroyToCloudinary(imageDestroy.image.public_id);
    for (const file of files) {
      const oneFile = await uploadImg(file);
      // console.log(oneFile);
      array.push({
        url: oneFile.url,
        public_id: oneFile.public_id,
        secure_url: oneFile.secure_url,
      });
    }

    // const image = await uploadImg(file);
    const result = await Cloth.findByIdAndUpdate(
      clothesId,
      { ...body, image: array },
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
