const express = require("express");

const { authAdmin, validation, ctrlWrapper } = require("../../middlewares");

const { joiImgSchema } = require("../../models/images/images");
const router = express.Router();
const { images: ctrl } = require("../../controllers");
const { upload } = require("../../service/upload.service");
router.post(
  "/",
  authAdmin,
  upload.array("images", 20),
  validation(joiImgSchema),
  ctrlWrapper(ctrl.addHome)
);
router.get("/", ctrlWrapper(ctrl.getHome));
router.delete("/:imagesId", authAdmin, ctrlWrapper(ctrl.removeHome));

module.exports = router;
