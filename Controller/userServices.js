const userModel = require("../models/userModel");
const handler = require("./handlerFactory");
const { v4: uuidv4 } = require("uuid");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/createToken");

// @desc Create User
// @route Post /api/v1/users
// @access Private

exports.createUser = handler.createHandler(userModel);

// @desc Get Specific User
// @route Get /api/v1/users/:id
// @access Public
exports.specificUser = handler.getSpecificOne(userModel);

// @desc Get all User
// @route Get /api/v1/users
// @access Public
exports.getUser = handler.getAll(userModel, "User");

// @desc Update specific User
// @route Put /api/v1/users/:id
// @access Private
exports.updateUser = asyncHandler(async (req, res, next) => {
  const docOfModel = await userModel.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      slug: req.body.slug,
      email: req.body.email,
      role: req.body.role,
      phone: req.body.phone,
      active: req.body.active,
    },
    { new: true }
  );
  if (!docOfModel) {
    return next(
      new ApiError(404, `${userModel} Cann't update for this: ${req.params.id}`)
    );
  }
  res.status(200).json({ data: docOfModel });
});

exports.updatePasswordAdmin = asyncHandler(async (req, res, next) => {
  const docOfModel = await userModel.findByIdAndUpdate(
    req.params.id,
    {
      password: await bcrypt.hash(req.body.password, 10),
      passwordChangeAt: Date.now(),
    },
    { new: true }
  );
  if (!docOfModel) {
    return next(
      new ApiError(
        404,
        `${userModel} Cann't update Password for this: ${req.params.id}`
      )
    );
  }
  res.status(200).json({ data: docOfModel });
});

// @desc Delete specific User
// @route delete /api/v1/users/:id
// @access Private
exports.unActivtedUser = handler.unActiveHandler(userModel);

// @desc Get User Profile
// @route Get /api/v1/users/myProfile
// @access Private/Protect
exports.getProfile = asyncHandler(async (req, res, next) => {
  req.params.id = req.user._id;
  next();
});

// @desc Update User Password
// @route Put /api/v1/users/myProfile
// @access Private/Protect
exports.updatePasswordUser = asyncHandler(async (req, res, next) => {
  const user = await userModel.findByIdAndUpdate(
    req.user._id,
    {
      password: await bcrypt.hash(req.body.password, 10),
      passwordChangeAt: Date.now(),
    },
    { new: true }
  );

  if (!user) {
    return next(new ApiError(404, `user is not found ${user._id}`));
  }
  const token = generateToken(user._id);
  res.status(200).json({ data: user, token });
});

// @desc Update User Data
// @route Put /api/v1/users/myProfile
// @access Private/Protect
exports.updateUserData = asyncHandler(async (req, res, next) => {
  const user = await userModel.findByIdAndUpdate(
    req.user._id,
    {
      email: req.body.email,
      name: req.body.name,
      phone: req.body.phone,
      profileImg: req.body.profileImg,
    },
    { new: true }
  );

  if (!user) {
    return next(new ApiError(404, `user is not found ${user._id}`));
  }
  const token = generateToken(user._id);
  res.status(200).json({ data: user, token });
});

// @desc Update User Data
// @route Put /api/v1/users/myProfile
// @access Private/Protect
exports.logOutUser = asyncHandler(async (req, res, next) => {
  const user = await userModel.findByIdAndUpdate(
    req.user._id,
    { active: false },
    { new: true }
  );
  if (!user) {
    return next(new ApiError(404, `user is not found ${user._id}`));
  }
  res.status(204).send();
});
