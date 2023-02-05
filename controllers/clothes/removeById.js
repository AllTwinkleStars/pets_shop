// const clothesOperations = require("../../models/clothes");
const createError = require("http-errors");
const { Cloth } = require("../../models");
const { destroyToCloudinary } = require("../../service/upload.service");

const removeById = async (req, res) => {
  const { clothesId } = req.params;
  // const result = await clothesOperations.removeClothes(clothesId);
  const result = await Cloth.findByIdAndRemove(clothesId);
  if (!result) {
    throw createError(404, `Product with id=${clothesId} not found`);
  }

  await destroyToCloudinary(result.image.public_id);
  res.json({
    status: "success",
    code: 200,
    message: "clothes deleted",
    data: { result },
  });
};
module.exports = removeById;