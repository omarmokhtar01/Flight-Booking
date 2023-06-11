const mongoose = require("mongoose");
var bcrypt = require("bcryptjs");

const roundTripSchema = new mongoose.Schema(
    {
        departure_city: {
            type: String,
            trim: true,
            required: [true, "Departure City is required"],
        },
        arrival_city: {
            type: String,
            trim: true,
            required: [true, "Arrival City is required"],
        },
        departure_date: {
            type: Date,
            required: [true, 'Departure Date is required'],
            default: Date.now
        },
        departure_time: {
            type: String,
            required: [true, 'Departure Date is required'],
        },
        return_date: {
            type: Date,
            required: [true, 'Return Date is required'],
            default: Date.now
        },
        num_passenger: {
            type: Number,
        },

        // cabin_class: {
        //     type: String,
        //     enum: ["economy", "first", "business"],
        //     default: "economy",
        //     required: [true, 'Cabin Class is required'],

        // },
        // paymentMethodType: {
        //     type: String,
        //     enum: ["card", "cash"],
        //     default: "cash",
        // },
        price: {
            type: Number,
            required: [true, "Product price is required"],
            max: [200000, "Too long product price"],
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Roundtrip", roundTripSchema);
