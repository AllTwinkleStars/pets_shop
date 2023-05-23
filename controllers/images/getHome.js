// const clothesOperations = require("../../models/clothes");
const { Image } = require("../../models");
const { ErrorHandler } = require("../../utils/errorHandler");
const getHome = async (req, res, next) => {
  // поиск своих товаров только определенному юзеру
  // const { _id, name, email } = req.admin;

  // const clothes = await Cloth.find({ owner: _id }).populate(
  //   "owner",
  //   "_id name email"
  // );
  try {
    const data = await Image.find({}).populate("owner", "_id name email");
    if (data) {
      res.json({
        status: "success",
        code: 200,
        data,
        allImg: data.length,
      });
    }
  } catch (error) {
    next(new ErrorHandler(error.statusCode || 500, error.message));
  }
};

module.exports = getHome;
