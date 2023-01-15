const clothesOperations = require("../../models/clothes");
const createError = require("http-errors");

const updateById = async (req, res) => {
  const { clothesId } = req.params;
  const result = await clothesOperations.updateClothes(clothesId, req.body);
  if (!result) {
    throw createError(404, `Product with id=${clothesId} not found`);
  }
  res.json({
    status: "success",
    code: 200,
    data: { result },
  });
};
module.exports = updateById;
