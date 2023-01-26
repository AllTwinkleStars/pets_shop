const express = require("express");
const {
  validation,
  authAdmin,
  ctrlWrapper,
  upload,
} = require("../../middlewares");
const { joiSchema, statusJoiSchema } = require("../../models/clothes");
const { clothes: ctrl } = require("../../controllers");
// const { uploadImage } = require("../../controller/upload.controller");
// const { upload } = require("../../service/upload.service");
const router = express.Router();

// router.post("/file", authAdmin, uploadCLoud.single("image"), uploadImage);

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:clothesId", ctrlWrapper(ctrl.getById));

router.post(
  "/",

  authAdmin,
  validation(joiSchema),
  ctrlWrapper(ctrl.add)
);

// router.post("/file", upload.single("image"), ctrlWrapper(uploadImage));

router.post(
  "/files",
  authAdmin,
  upload.single("image"),
  ctrlWrapper(ctrl.addFiles)
);

router.put(
  "/:clothesId",
  authAdmin,
  validation(joiSchema),
  ctrlWrapper(ctrl.updateById)
);

router.patch(
  "/:clothesId/status",
  authAdmin,
  validation(statusJoiSchema),
  ctrlWrapper(ctrl.updateStatusById)
);

router.delete("/:clothesId", authAdmin, ctrlWrapper(ctrl.removeById));

module.exports = router;
