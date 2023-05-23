const createError = require("http-errors");
const { Cloth } = require("../../models");
const { ErrorHandler } = require("../../utils/errorHandler");

const getById = async (req, res, next) => {
  try {
    const { clothesId } = req.params;
    // const result = await Cloth.findOne({ _id: clothesId });
    const result = await Cloth.findById(clothesId);
    console.log(result);
    if (!result) {
      throw createError(404, `Product with id=${clothesId} not found`);
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    next(new ErrorHandler(error.statusCode || 500, error.message));
  }
  // const error = new Error(`Product with id=${clothesId} not found`);
  // error.status = 404;
  // throw error;
  //
  // res.status(404).json({
  //   status: "Error",
  //   code: 404,
  //   message: `Product with id=${clothesId} not found`,
  // });
  // return;

  //   res.json({
  //     status: "success",
  //     code: 200,
  //     data: {
  //       result,
  //     },
  //   });

  //   } catch (error) {
  //     next(error);
  // res.status(500).json({
  //   status: "error",
  //   code: 500,
  //   message: "Server error",
  // });
  //   }
};

module.exports = getById;
