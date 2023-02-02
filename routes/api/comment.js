const express = require("express");
const { commentsJoiSchema } = require("../../models/comments");
const { auth, validation, ctrlWrapper } = require("../../middlewares");
const { comments: ctrl } = require("../../controllers");

const router = express.Router();

router.get("/:clothesId", ctrlWrapper(ctrl.getAll));
router.post(
  "/:clothesId",
  auth,
  validation(commentsJoiSchema),
  ctrlWrapper(ctrl.add)
);

module.exports = router;
