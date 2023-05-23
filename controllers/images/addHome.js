const { Image } = require("../../models");
const { ErrorHandler } = require("../../utils/errorHandler");
const uploadImg = require("../clothes/uploadImg");

const addHome = async (req, res, next) => {
  try {
    const { files, body } = req;
    const { _id } = req.user;
    const array = [];

    for (const file of files) {
      const oneFile = await uploadImg(file);
      // console.log(oneFile);
      array.push({
        url: oneFile.url,
        public_id: oneFile.public_id,
        secure_url: oneFile.secure_url,
      });
    }
    const data = await Image.create({
      ...body,
      images: array,

      owner: _id,
    });

    res.json({
      status: "success",
      code: 201,
      data,
    });
  } catch (error) {
    next(new ErrorHandler(error.statusCode || 500, error.message));
  }
};

module.exports = addHome;
