const express = require("express");

const { auth, validation, ctrlWrapper } = require("../../middlewares");

const { auth: ctrl } = require("../../controllers");
const { joiSignUpSchema, joiLoginSchema } = require("../../models/users");
const router = express.Router();

router.post("/signup", validation(joiSignUpSchema), ctrlWrapper(ctrl.signup));

router.post("/login", validation(joiLoginSchema), ctrlWrapper(ctrl.login));

router.get("/logout", auth, ctrlWrapper(ctrl.logout));

router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));

// router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verifyEmail));
// router.post("/signup");

module.exports = router;
