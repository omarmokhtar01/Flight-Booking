const bookingModel = require("../models/bookingModel");
const oneWayModel = require("../models/oneWayModel");
const multiWayModel = require("../models/multiWayModel");
const roundTripModel = require("../models/roundTripModel");
const handler = require('./handlerFactory');
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");

// Get Flights
exports.getOneWayFlight = handler.getAll(oneWayModel, 'Oneway')
exports.getTwoWayFlight = handler.getAll(multiWayModel, 'Twoway')
exports.getRoundTripFlight = handler.getAll(roundTripModel, 'Roundtrip')

// Get All Flights
exports.getAllFlights = asyncHandler(async (req, res) => {
    const flight1 = await oneWayModel.find();
    const flight2 = await multiWayModel.find();
    const flight3 = await roundTripModel.find();

    res.status(200).json({ numOfFlights: flight1.length + flight2.length + flight3.length, data: flight1, flight2, flight3 })

});
// Get One Flights
exports.getSpecificOneWayFlight = handler.getSpecificOne(oneWayModel)
exports.getSpecificTwoWayFlight = handler.getSpecificOne(multiWayModel)
exports.getSpecificRoundTripFlight = handler.getSpecificOne(roundTripModel)

// Get All Booking For User
exports.getAllBookingUser = asyncHandler(async (req, res) => {
    const user = await bookingModel.find({ user: req.user._id });
    res.status(200).json({ data: user })

});
// Booking
exports.bookOneWayFlight = asyncHandler(async (req, res, next) => {
    const { num_passenger, cabin_class, paymentMethodType } = req.body
    const book = await (await bookingModel.create({ user: req.user._id, flight_oneWay: req.params.id, num_passenger, cabin_class, paymentMethodType }))
        .populate({ path: 'flight_oneWay user' });
    const oneWay = await oneWayModel.findOne({ _id: req.params.id })
    book.totalBookingPrice = book.flight_oneWay.price * req.body.num_passenger;
    // 1) check if num of Booking less than flight passanger avaliable
    if (num_passenger > oneWay.num_passenger) {
        return next(new ApiError(404, 'number of passanger is not avaliable'))
    }
    // if num of passanger is avaliable
    if (oneWay.num_passenger < 0) {
        return next(new ApiError(404, 'This Flight is completed passanger'))
    }
    oneWay.num_passenger = oneWay.num_passenger - num_passenger

    await oneWay.save()
    await book.save()

    res.status(201).json({ data: book });
});

exports.bookTwoWayFlight = asyncHandler(async (req, res, next) => {
    const { num_passenger, cabin_class, paymentMethodType } = req.body

    const book = await (await bookingModel.create({ user: req.user._id, flight_twoWay: req.params.id, num_passenger, cabin_class, paymentMethodType }))
        .populate({ path: 'flight_twoWay user' });
    const twoWay = await multiWayModel.findOne({ _id: req.params.id })

    book.totalBookingPrice = book.flight_twoWay.price * req.body.num_passenger;
    // / 1) check if num of Booking less than flight passanger avaliable
    if (num_passenger > twoWay.num_passenger) {
        return next(new ApiError(404, 'number of passanger is not avaliable'))
    }
    // if num of passanger is avaliable
    if (twoWay.num_passenger < 0) {
        return next(new ApiError(404, 'This Flight is completed passanger'))
    }
    twoWay.num_passenger = twoWay.num_passenger - num_passenger

    await twoWay.save()
    await book.save()
    res.status(201).json({ data: book });
});

exports.bookRoundTripFlight = asyncHandler(async (req, res, next) => {
    const { num_passenger, cabin_class, paymentMethodType } = req.body

    const book = await (await bookingModel.create({ user: req.user._id, flight_roundTrip: req.params.id, num_passenger, cabin_class, paymentMethodType }))
        .populate({ path: 'flight_roundTrip user' });
    const roundTrip = await roundTripModel.findOne({ _id: req.params.id })

    book.totalBookingPrice = book.flight_roundTrip.price * req.body.num_passenger;
    // / 1) check if num of Booking less than flight passanger avaliable
    if (num_passenger > roundTrip.num_passenger) {
        return next(new ApiError(404, 'number of passanger is not avaliable'))
    }
    // if num of passanger is avaliable
    if (roundTrip.num_passenger < 0) {
        return next(new ApiError(404, 'This Flight is completed passanger'))
    }
    roundTrip.num_passenger = roundTrip.num_passenger - num_passenger

    await roundTrip.save()
    await book.save()
    res.status(201).json({ data: book });

});


// Create
exports.CreateOneWay = asyncHandler(async (req, res) => {
    const flight = await oneWayModel.create(req.body)
    res.status(201).json({ data: flight });
});

exports.CreateTwoWay = asyncHandler(async (req, res) => {
    const flight = await multiWayModel.create(req.body)
    res.status(201).json({ data: flight });
});
exports.CreateRoundTrip = asyncHandler(async (req, res) => {
    const flight = await roundTripModel.create(req.body)
    res.status(201).json({ data: flight });
});
exports.roundTripFlight = handler.getSpecificOne(roundTripModel)