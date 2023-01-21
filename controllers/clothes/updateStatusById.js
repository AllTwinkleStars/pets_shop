const { Cloth } = require("../../models");
const createError = require("http-errors");

const updateStatusById = async (req, res, next) => {
  const { clothesId } = req.params;
  const { status } = req.body;
  const result = await Cloth.findByIdAndUpdate(
    clothesId,
    { status },
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
};

module.exports = updateStatusById;
