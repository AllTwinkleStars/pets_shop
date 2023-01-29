const { ErrorHandler } = require("../../utils/errorHandler");

const { Cloth } = require("../../models");
const uploadImg = require("./uploadImg");

const uploadImage = async (req, res, next) => {
  try {
    const { file, body } = req;
    const image = await uploadImg(file);

    console.log(file);

    const { _id } = req.admin;
    const result = await Cloth.create({
      ...body,
      image,
      owner: _id,
    });

    res.json({
      status: "success",
      message: "Upload successful",
      data: result,
    });
  } catch (error) {
    next(new ErrorHandler(error.statusCode || 500, error.message));
  }
};

module.exports = {
  uploadImage,
};

// const { uploadToCloudinary } = require("../../service/upload.service");
// const { ErrorHandler } = require("../../utils/errorHandler");
// const { bufferToDataURI } = require("../../utils/file");
// const { Cloth } = require("../../models");

// const uploadImage = async (req, res, next) => {
//   try {
//     const { file } = req;

//     if (!file) throw new ErrorHandler(400, "Image is required");

//     const fileFormat = file.mimetype.split("/")[1];
//     const { base64 } = bufferToDataURI(fileFormat, file.buffer);

//     const imageDetails = await uploadToCloudinary(base64, fileFormat);

//     const { _id } = req.admin;
//     const result = await Cloth.create({
//       ...req.body,
//       image: imageDetails,
//       owner: _id,
//     });

//     res.json({
//       status: "success",
//       message: "Upload successful",
//       data: result,
//     });
//   } catch (error) {
//     next(new ErrorHandler(error.statusCode || 500, error.message));
//   }
// };

// module.exports = {
//   uploadImage,
// };
