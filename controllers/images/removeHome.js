// const clothesOperations = require("../../models/clothes");
const createError = require("http-errors");
const { Image } = require("../../models");
const { destroyToCloudinary } = require("../../service/upload.service");

const removeHome = async (req, res) => {
  const { imagesId } = req.params;
  // const result = await clothesOperations.removeClothes(clothesId);
  const data = await Image.findByIdAndRemove(imagesId);
  if (!data) {
    throw createError(404, `Product with id=${imagesId} not found`);
  }

  for (const item of data.images) {
    console.log(item.public_id);
    await destroyToCloudinary(item.public_id);
  }
  // await destroyToCloudinary(data.image.public_id);
  res.json({
    status: "success",
    code: 200,
    message: "clothes deleted",
    data,
  });
};
module.exports = removeHome;
