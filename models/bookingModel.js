const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
        },
        flight_oneWay: {
            type: mongoose.Schema.ObjectId,
            ref: "Oneway",
        },
        flight_twoWay: {
            type: mongoose.Schema.ObjectId,
            ref: "Twoway",
        },
        flight_roundTrip: {
            type: mongoose.Schema.ObjectId,
            ref: "Roundtrip",
        },
        totalBookingPrice: {
            type: Number,
        },
        isPaid: Boolean,
        paidAt: Date,
        num_passenger: {
            type: Number,
        },

        cabin_class: {
            type: String,
            enum: ["economy", "first", "business"],
            default: "economy",
            required: [true, 'Cabin Class is required'],

        },
        paymentMethodType: {
            type: String,
            enum: ["card", "cash"],
            default: "cash",
        },
        
    },
    { timestamps: true }
);

module.exports = mongoose.model("Booking", bookSchema);
