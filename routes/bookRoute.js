const express = require("express");

const { flightValidator,
    // ruleRoundTripFlightValidator, 
    // ruleTwoWayFlightValidator 
} = require('../utils/validator/booking')

const {
    // Get User Booking
    getAllBookingUser,
    // Get specific Ways
    getSpecificOneWayFlight,
    getSpecificTwoWayFlight,
    getSpecificRoundTripFlight,

    // Get Ways
    getOneWayFlight,
    getRoundTripFlight,
    getTwoWayFlight,
    getAllFlights,
    // Create Ways (admin)
    CreateOneWay,
    CreateTwoWay,
    CreateRoundTrip,

    // Booking Users
    bookOneWayFlight,
    bookRoundTripFlight,
    bookTwoWayFlight
} = require("../Controller/bookingServices");

const { authProtect, allowedTo } = require("../Controller/authService");


const router = express.Router();

// Get User Booking
router
    .get("/get-all-booking", authProtect, allowedTo("user"), getAllBookingUser,);
// Get specific Ways
router
    .get("/one-way/:id", getSpecificOneWayFlight,);
router
    .get("/multi-way/:id", getSpecificTwoWayFlight,);

router
    .get("/round-trip/:id", getSpecificRoundTripFlight,);

// Get Ways
router
    .get("/one-way", getOneWayFlight,);

router
    .get("/multi-way", getTwoWayFlight,);

router
    .get("/round-trip", getRoundTripFlight,);

router
    .get("/all-flight", getAllFlights,);


// Create Ways (admin)
router
    .post("/create-oneWay", CreateOneWay,);

router
    .post("/create-twoWay", CreateTwoWay,);

router
    .post("/create-roundWay", CreateRoundTrip,);


// Booking Users
router.use(authProtect, allowedTo("user"))
router
    .post("/one-way/:id",
        flightValidator,
        bookOneWayFlight,
    );

router
    .post("/round-trip/:id", flightValidator, bookRoundTripFlight,
    );

router
    .post("/multi-way/:id", flightValidator, bookTwoWayFlight,
    );


module.exports = router;