const { Comment } = require("../../models");
const { ErrorHandler } = require("../../utils/errorHandler");
const createError = require("http-errors");

const getAll = async (req, res, next) => {
  const { clothesId } = req.params;
  try {
    const result = await Comment.find({ product: clothesId });
    if (result.length === 0) {
      throw createError(
        404,
        `No comments were found for this product id=${clothesId}`
      );
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

module.exports = getAll;
