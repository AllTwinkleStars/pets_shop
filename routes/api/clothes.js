const express = require("express");
const {
  validation,
  authAdmin,
  ctrlWrapper,
  // upload,
} = require("../../middlewares");
// const { upload } = require("../../service/upload.service");
const {
  joiSchema,
  statusJoiSchema,
  discountSchema,
} = require("../../models/clothes");
const { clothes: ctrl } = require("../../controllers");
const model = require("../../controllers/clothes/clothesGroup");
const router = express.Router();

// const { uploadImage } = require("../../controllers/clothes/upload.controller");
const { upload } = require("../../service/upload.service");

const { updateImg } = require("../../controllers/clothes/updateImg");

// router.post("/", authAdmin, upload.single("image"), uploadImage);

// router.post("/file", authAdmin, uploadCLoud.single("image"), uploadImage);

router.get("/", ctrlWrapper(ctrl.getPage));
router.get("/all", ctrlWrapper(ctrl.getAll));
router.get("/blanket", ctrlWrapper(model.getBlanket));
router.get("/bomber", ctrlWrapper(model.getBomber));
router.get("/briefs", ctrlWrapper(model.getBriefs));
router.get("/dress", ctrlWrapper(model.getDress));
router.get("/hats", ctrlWrapper(model.getHats));
router.get("/jacket", ctrlWrapper(model.getJacket));
router.get("/overalls", ctrlWrapper(model.getOveralls));
router.get("/scarves", ctrlWrapper(model.getScarves));
router.get("/shirt", ctrlWrapper(model.getShirt));
router.get("/singlet", ctrlWrapper(model.getSinglet));
router.get("/skinny", ctrlWrapper(model.getSkinny));
router.get("/skirt", ctrlWrapper(model.getSkirt));
router.get("/suits", ctrlWrapper(model.getSuits));
router.get("/sweatshirt", ctrlWrapper(model.getSweatshirt));
router.get("/trousers", ctrlWrapper(model.getTrousers));
router.get("/tShirt", ctrlWrapper(model.getTshirt));
router.get("/vest", ctrlWrapper(model.getVest));
router.get("/embroidery", ctrlWrapper(model.getEmbroidery));
router.get("/footwear", ctrlWrapper(model.getFootwear));
router.get("/couch", ctrlWrapper(model.getCouch));
router.get("/hoodies", ctrlWrapper(model.getHoodies));

router.post("/mail", ctrlWrapper(ctrl.sendMail));

router.get("/:clothesId", ctrlWrapper(ctrl.getById));
router.post("/filter", ctrlWrapper(ctrl.getFilter));

router.post(
  "/",
  authAdmin,
  upload.single("image"),
  validation(joiSchema),
  ctrlWrapper(ctrl.add)
);

// router.post("/file", upload.single("image"), ctrlWrapper(uploadImage));

// router.post(
//   "/files",
//   authAdmin,
//   upload.single("image"),
//   ctrlWrapper(ctrl.addFiles)
// );

router.patch(
  "/:clothesId/img",
  authAdmin,
  upload.single("image"),
  ctrlWrapper(updateImg)
);
router.put(
  "/:clothesId",
  authAdmin,
  upload.single("image"),
  validation(joiSchema),
  ctrlWrapper(ctrl.updateById)
);

router.patch(
  "/:clothesId/status",
  authAdmin,
  validation(statusJoiSchema),
  ctrlWrapper(ctrl.updateStatusById)
);

router.patch(
  "/:clothesId/discount",
  authAdmin,
  validation(discountSchema),
  ctrlWrapper(ctrl.updateDiscountById)
);

router.delete("/:clothesId", authAdmin, ctrlWrapper(ctrl.removeById));

module.exports = router;
