const fs = require("fs/promises");
const path = require("path");
// const cloudinary = require("cloudinary").v2;
// const { Cloth } = require("../../models");

const clothesDir = path.join(__dirname, "../../", "public", "clothes");

const clothes = [];

const addFiles = async (req, res, next) => {
  const { path: tempUpload, originalname } = req.file;

  try {
    const resultUpload = path.join(clothesDir, originalname);
    await fs.rename(tempUpload, resultUpload);
    const image = path.join("clothes", originalname);

    clothes.push({ name: req.body.name, image });
    // const result = await Cloth.create({ name: req.body.name, image });
    res.status(201).json(clothes);
  } catch (error) {
    await fs.unlink(tempUpload);
    throw error;
  }
};
module.exports = addFiles;

// const { uploadToCloudinary } = require("../../service/upload.service");
// const { ErrorHandler } = require("../../utils/errorHandler");
// const { bufferToDataURI } = require("../../utils/file");

// const uploadImage = async (req, res, next) => {
//   try {
//     const { file } = req;
//     if (!file) throw new ErrorHandler(400, "Image is required");
// console.log(file.mimetype)
//     const fileFormat = file.mimetype.split("/")[1];
//     const { base64 } = bufferToDataURI(fileFormat, file.buffer);

//     const imageDetails = await uploadToCloudinary(base64, fileFormat);

//     res.json({
//       status: "success",
//       message: "Upload successful",
//       data: imageDetails,
//     });
//   } catch (error) {
//     next(new ErrorHandler(error.statusCode || 500, error.message));
//   }
// };

// module.exports = {
//   uploadImage,
// };
