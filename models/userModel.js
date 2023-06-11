const mongoose = require("mongoose");
var bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    fname: {
      type: String,
      trim: true,
      required: [true, "First Name is required"],
    },
    lname: {
      type: String,
      trim: true,
      required: [true, "Last Name is required"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    email: {
      type: String,
      uniqe: true,
      required: [true, "email is required"],
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
      minlength: [8, "too short password"],
    },
    passwordChangeAt: Date,
    passwordResetCode: String,
    passwordResetExpire: Date,
    passwordResetVerify: Boolean,
    role: {
      type: String,
      default: "user",
    },
    phone: {
      type: String,
      required: [true, 'Phone is required']

    },
    gender: {
      type: String,
      enum: ['male', 'female'],
      required: [true, 'Gender is required male or female']
    },
    birthday: {
      type: Date,
      required: [true, 'Birthday is required'],
      default: Date.now
    },
    // booking: {
    //   type: mongoose.Schema.ObjectId,
    //   ref: "Booking",
    //   required: [true, "booking must be belong to Booking"],
    // }
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 8);
  next();
});

module.exports = mongoose.model("User", userSchema);
