const { Comment, Cloth } = require("../../models");
const createError = require("http-errors");
const { ErrorHandler } = require("../../utils/errorHandler");

const add = async (req, res, next) => {
  try {
    const { body, params } = req;
    const { clothesId } = params;
    const { _id, name, lastName, parent = null } = req.user;
    const idCloth = await Cloth.findById(clothesId);

    if (!idCloth) {
      throw createError(404, `Product with id=${clothesId} not found`);
    }

    const result = await Comment.create({
      text: body.text,
      authorId: _id,
      authorName: name,
      authorLastName: lastName,
      parent,
      product: clothesId,
    });

    res.json({
      status: "success",
      code: 201,
      result,
    });
  } catch (error) {
    next(new ErrorHandler(error.statusCode || 500, error.message));
  }
};

module.exports = add;
