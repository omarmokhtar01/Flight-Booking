const { check } = require('express-validator');
const validatorMiddleware = require("../../middlewares/validatorMiddleware")

exports.flightValidator =
    [
        check('num_passenger')
            .notEmpty()
            .withMessage('num_passenger Should Not Empty')
            .isNumeric()
            .withMessage('Should be String')
            .isInt({ min: 1, max: 7 })
            .withMessage('Invalid Length num_passenger between 1 , 7 charactar')
        // cabin_class
        , check('cabin_class')
            .notEmpty()
            .withMessage('cabin_class Should Not Empty')
            .isString()
            .withMessage('cabin_class Should be String')
        // paymentMethodType
        , check('paymentMethodType')
            .notEmpty()
            .withMessage('paymentMethodType Should Not Empty')
            .isString()
            .withMessage('paymentMethodType Should be String')
        , validatorMiddleware
    ]