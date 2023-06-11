const express = require("express");
const {
  ruleCreateUserValidator,
  rulePasswordAdminValidator,
  rulePasswordUserValidator,
  ruleUpdateUserLoggerValidator,
} = require("../utils/validator/users");

const {
  createUser,
  getUser,
  specificUser,
  updateUser,
  unActivtedUser,
  updatePasswordAdmin,
  // User Routes
  getProfile,
  updatePasswordUser,
  updateUserData,
  logOutUser,
} = require("../Controller/userServices");

const { authProtect, allowedTo } = require("../Controller/authService");

const router = express.Router();

// User
router.use(authProtect);
router
  .route("/myProfile")
  .get(getProfile, specificUser)
  .put(rulePasswordUserValidator, updatePasswordUser)
  .delete(logOutUser);
router
  .route("/data")
  .put(
    ruleUpdateUserLoggerValidator,
    updateUserData
  );

// Admin
router.use(authProtect, allowedTo("admin", "manager"));

router
  .route("/changepassword/:id")
  .put(authProtect, rulePasswordAdminValidator, updatePasswordAdmin);

router
  .route("/")
  .get(getUser)
  .post(ruleCreateUserValidator, createUser);

router
  .route("/:id")
  .get(specificUser)
  .put(updateUser)
  .delete(unActivtedUser);

module.exports = router;
