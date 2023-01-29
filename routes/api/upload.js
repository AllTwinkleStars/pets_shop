const { Router } = require("express");
const { uploadImage } = require("../../controllers/clothes/upload.controller");
const { upload } = require("../../service/upload.service");
const { authAdmin } = require("../../middlewares");
const { updateImg } = require("../../controllers/clothes/updateImg");

const router = Router();

// router.post("/", authAdmin, upload.single("image"), uploadImage);

router.patch("/:clothesId", authAdmin, upload.single("image"), updateImg);
// router.get("/", upload.single("image"), uploadImage);

module.exports = router;
