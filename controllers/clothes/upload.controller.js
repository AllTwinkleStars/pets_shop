const { uploadToCloudinary } = require("../../service/upload.service");
const { ErrorHandler } = require("../../utils/errorHandler");
const { bufferToDataURI } = require("../../utils/file");

const uploadImage = async (req, res, next) => {
  try {
    const { file } = req;
    if (!file) throw new ErrorHandler(400, "Image is required");

    const fileFormat = file.mimetype.split("/")[1];
    const { base64 } = bufferToDataURI(fileFormat, file.buffer);

    const imageDetails = await uploadToCloudinary(base64, fileFormat);

    res.json({
      status: "success",
      message: "Upload successful",
      data: imageDetails,
    });
  } catch (error) {
    next(new ErrorHandler(error.statusCode || 500, error.message));
  }
};

module.exports = {
  uploadImage,
};
