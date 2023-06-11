const asyncHandler = require("express-async-handler"),
    stripe = require("stripe")(process.env.STRIPE_SECRET),
    bookingModel = require('../models/bookingModel'),
    userModel = require("../models/userModel"),
    handler = require("./handlerFactory"),
    ApiError = require("../utils/apiError");











// @desc create Checkout Session
// @route Put /api/v1/order/create-checkout-session/bookingId
// @access Private(user)
exports.createCheckoutSession = asyncHandler(async (req, res, next) => {
    const { shippingAddress } = req.body;

    //1- Get Booking by bookingId
    const booking = await bookingModel.findById(req.params.bookingId);
    if (!booking) {
        return next(new ApiError(404, `this user don't have any booking`));
    }
    //2- Get order Price from Cart check(coupon or not)

    // eslint-disable-next-line prefer-destructuring
    let totalBookingPrice = booking.totalBookingPrice;

    // stripe checkout sessions
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
            {
                // https://stripe.com/docs/api/checkout/sessions/object
                // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                // amount: totalOrderPrice * 100,
                // name: req.user.name,
                price_data: {
                    currency: "egp",
                    product_data: {
                        name: req.user.fname,
                    },

                    unit_amount: totalBookingPrice * 100,
                },
                quantity: 1,
                // name: req.user.name,
                // currency: "egp",
            },
        ],
        mode: "payment",
        success_url: "http://sitename.com/checkout-success",
        cancel_url: "http://sitename.com/checkout-cancel",

        // req.protocol (http,http) If I want to get the domain I stand on dynamically https://www.udemy.com/
        // success_url: `${req.protocol}://${req.get("host")}/order`,
        // cancel_url: `${req.protocol}//:${req.get("host")}/cart`,
        customer_email: req.user.email,
        // customer_name: req.user.name,
        // client_reference_id: cart._id.toString(),
        client_reference_id: req.params.bookingId,
        // This can be useful for storing additional information about the object in a structured format.
        metadata: shippingAddress,
    });
    // 4- send session
    res.status(200).json({ session });
});

const createCardOrder = async (session) => {
    const bookingId = session.client_reference_id;

    // const booking = await bookingModel.findById(bookingId);

    // 3) Create booking with default paymentMethodType card
    // const book = 
    await bookingModel.findByIdAndUpdate(bookingId, {
        isPaid: true,
        paidAt: Date.now(),
        paymentMethodType: "card"
    });
};



// @desc    This webhook will run when stripe payment success paid
// @route   POST /webhook-checkout
// @access  Protected/User
exports.webhookCheckOut = asyncHandler(async (req, res, next) => {
    const sig = req.headers["stripe-signature"];

    let event;

    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            process.env.WEB_HOOK_SECRET
        );
    } catch (err) {
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    if (event.type == "checkout.session.completed") {
        console.log("create order....");
    }
    if (event.type == "checkout.session.completed") {
        createCardOrder(event.data.object);
    }

    // Return a 200 response to acknowledge receipt of the event
    res.status(200).json({ data: true });
});