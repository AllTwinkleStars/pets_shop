// const clothesOperations = require("../../models/clothes");
const { Cloth } = require("../../models");
const { ErrorHandler } = require("../../utils/errorHandler");
const getAll = async (req, res, next) => {
  // поиск своих товаров только определенному юзеру
  // const { _id, name, email } = req.admin;

  // const clothes = await Cloth.find({ owner: _id }).populate(
  //   "owner",
  //   "_id name email"
  // );
  try {
    const clothesAll = await Cloth.find({});
    const clothes = await Cloth.find({}).populate("owner", "_id name email");

    res.json({
      status: "success",
      code: 200,
      data: { clothes },
      allElements: clothesAll.length,
    });
  } catch (error) {
    next(new ErrorHandler(error.statusCode || 500, error.message));
  }
};

module.exports = getAll;
