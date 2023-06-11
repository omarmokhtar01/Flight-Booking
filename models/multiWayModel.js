const mongoose = require("mongoose");
var bcrypt = require("bcryptjs");

const oneWaySchema = new mongoose.Schema(
    {
        from_city1: {
            type: String,
            trim: true,
            required: [true, "Departure City is required"],
        },
        to_city1: {
            type: String,
            trim: true,
            required: [true, "Arrival City is required"],
        },
        from_date1: {
            type: Date,
            required: [true, 'Departure Date is required'],
            default: Date.now
        },
        to_date1: {
            type: Date,
            required: [true, 'Departure Date is required'],
            default: Date.now
        },


        from_city2: {
            type: String,
            trim: true,
            required: [true, "Departure City is required"],
        },
        to_city2: {
            type: String,
            trim: true,
            required: [true, "Arrival City is required"],
        },

        from_date2: {
            type: Date,
            required: [true, 'Departure Date is required'],
            default: Date.now
        },
        to_date2: {
            type: Date,
            required: [true, 'Departure Date is required'],
            default: Date.now
        },
        num_passenger: {
            type: Number,
        },
        
        departure_time: {
            type: String,
            required: [true, 'Departure Date is required'],
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

module.exports = mongoose.model("Twoway", oneWaySchema);
