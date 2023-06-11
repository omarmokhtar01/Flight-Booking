const express = require("express");
const {
  ruleSignUpValidator,
  ruleLoginValidator,
} = require("../utils/validator/authValidate");

const {
  signup,
  login,
  forgotPassword,
  verifyResetCodePassword,
  resetPassword,
} = require("../Controller/authService");

const router = express.Router();

router.route("/signup").post(ruleSignUpValidator, signup);

router.route("/login").post(ruleLoginValidator, login);

router.post("/forgotpassword", forgotPassword);
router.post("/verify-reset-code", verifyResetCodePassword);
router.post("/resetPassword", resetPassword);

module.exports = router;
