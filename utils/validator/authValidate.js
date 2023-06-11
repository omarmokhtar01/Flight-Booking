const { check, body } = require('express-validator');
const userModel = require("../../models/userModel")
const validatorMiddleware = require("../../middlewares/validatorMiddleware")

exports.ruleSignUpValidator =
    [
        // Check Fname
        check('fname')
            .notEmpty()
            .withMessage('First Name Should Not Empty')
            .isString()
            .withMessage('First Name Should be String')
            .isLength({ min: 3, max: 32 })
            .withMessage('Invalid Length First Name between 3 , 32 charactar'),
        // Check Lname
        check('lname')
            .notEmpty()
            .withMessage('Last Name Should Not Empty')
            .isString()
            .withMessage('Last Name Should be String')
            .isLength({ min: 3, max: 32 })
            .withMessage('Invalid Length Last Name between 3 , 32 charactar'),
        // Check role
        check("role").default("user"),
        // Check phone
        check("phone")
            .notEmpty()
            .withMessage('phone Should Not Empty')
            .isMobilePhone(["ar-EG", "ar-SA"])
            .withMessage("Phone Number should egypt or saudi"),
        // Check BirthDay
        check("birthday")
            .notEmpty()
            .withMessage('birthday Should Not Empty')
            .isISO8601().toDate()
            .withMessage("birthday should be Date"),
        // Check Gender
        check("gender")
            .notEmpty()
            .withMessage('Gender Should Not Empty')
            .isString()
            .withMessage("Gender should be String male or female"),
        // Check Email
        check('email')
            .notEmpty()
            .withMessage('Email Should Not Empty')
            .isEmail()
            .withMessage('Input should be Email')
            .custom((value) => {
                return userModel.findOne({ email: value }).then((user) => {
                    if (user) {
                        return Promise.reject("E-mail already in use");
                    }
                });
            })
        ,
        // Check Password
        check('password')
            .notEmpty()
            .withMessage('Password is Required')
            .isLength({ min: 6 }),
        body('confirmedPassword')
            .exists({ checkFalsy: true })
            .withMessage('You must type a confirmation password')
            .custom((value, { req }) => value === req.body.password)
            .withMessage("The passwords do not match")
        , validatorMiddleware
    ]

exports.ruleLoginValidator =
    [
        // Check Email
        check('email')
            .notEmpty()
            .withMessage('Email Should Not Empty')
            .isEmail()
            .withMessage('Input should be Email'),
        // Check Password
        check('password')
            .notEmpty()
            .withMessage('Password is Required')
            .isLength({ min: 6 })
        , validatorMiddleware
    ]