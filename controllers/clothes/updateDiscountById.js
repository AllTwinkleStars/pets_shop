const { Cloth } = require("../../models");
const createError = require("http-errors");
const { ErrorHandler } = require("../../utils/errorHandler");

const updateDiscountById = async (req, res, next) => {
  try {
    const { clothesId } = req.params;
    const { discount } = req.body;

    const data = await Cloth.findByIdAndUpdate(
      clothesId,
      { discount },
      { new: true }
    );
    if (!data) {
      throw createError(404, `Product with id=${clothesId} not found`);
    }

    res.json({
      status: "success",
      code: 200,
      data,
    });
  } catch (error) {
    next(new ErrorHandler(error.statusCode || 500, error.message));
  }
};

module.exports = updateDiscountById;
