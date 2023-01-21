const createError = require("http-errors");
const { Cloth } = require("../../models");

const updateById = async (req, res) => {
  const { clothesId } = req.params;
  const result = await Cloth.findByIdAndUpdate(clothesId, req.body, {
    new: true,
  });
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
