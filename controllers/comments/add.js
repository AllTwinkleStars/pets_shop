const { Comment, Cloth } = require("../../models");
const createError = require("http-errors");
const { ErrorHandler } = require("../../utils/errorHandler");

const add = async (req, res, next) => {
  try {
    const { body, params } = req;
    const { clothesId } = params;
    const { _id, name, lastName } = req.user;
    const idCloth = await Cloth.findById(clothesId);

    if (!idCloth) {
      throw createError(404, `Product with id=${clothesId} not found`);
    }

    const result = await Comment.create({
      ...body,
      authorId: _id,
      author: `${name} ${lastName}`,

      product: clothesId,
    });

    res.json({
      status: "success",
      code: 201,
      data: result,
    });
  } catch (error) {
    next(new ErrorHandler(error.statusCode || 500, error.message));
  }
};

module.exports = add;
