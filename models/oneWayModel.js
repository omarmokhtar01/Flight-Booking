const mongoose = require("mongoose");
var bcrypt = require("bcryptjs");

const oneWaySchema = new mongoose.Schema(
    {
        departure_city: {
            type: String,
            required: [true, "Departure City is required"],
        },
        arrival_city: {
            type: String,
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
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Oneway", oneWaySchema);
