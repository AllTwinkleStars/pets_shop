const express = require("express");

const { validation, ctrlWrapper } = require("../../middlewares");
const { clothesSchema } = require("../../controllers");
const { clothes: ctrl } = require("../../controllers");

const validateMiddleware = validation(clothesSchema);

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:clothesId", ctrlWrapper(ctrl.getById));

router.post("/", validateMiddleware, ctrlWrapper(ctrl.add));

router.put("/:clothesId", validateMiddleware, ctrlWrapper(ctrl.updateById));

router.delete("/:clothesId", ctrlWrapper(ctrl.removeById));

module.exports = router;
