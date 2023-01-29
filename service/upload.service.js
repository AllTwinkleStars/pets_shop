const multer = require("multer");
const cloudinary = require("cloudinary");
const { ErrorHandler } = require("../utils/errorHandler");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const memoryStorage = multer.memoryStorage();

const upload = multer({
  storage: memoryStorage,
});

const uploadToCloudinary = async (fileString, format) => {
  try {
    const res = await cloudinary.v2.uploader.upload(
      `data:image/${format};base64,${fileString}`,
      {
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_secret: process.env.CLOUDINARY_API_SECRET,
        api_key: process.env.CLOUDINARY_API_KEY,
      }
    );

    return res;
  } catch (error) {
    throw new ErrorHandler(500, error);
  }
};

const explicitToCloudinary = async (id, options) => {
  try {
    const { uploader } = cloudinary.v2;
    const res = await uploader.explicit(id, { options });
    return res;
  } catch (error) {
    throw new ErrorHandler(500, error);
  }
};
const destroyToCloudinary = async (id, options) => {
  try {
    cloudinary.v2.uploader.destroy(id, {
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      api_key: process.env.CLOUDINARY_API_KEY,
    });
  } catch (error) {
    throw new ErrorHandler(500, error);
  }
};

module.exports = {
  upload,
  cloudinary,
  uploadToCloudinary,
  explicitToCloudinary,
  destroyToCloudinary,
};
