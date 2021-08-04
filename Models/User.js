const mongoose = require("mongoose");
const crypto = require("crypto");
const { v1: uuidv1 } = require("uuid");
const { timeStamp } = require("console");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: "true",
      maxlength: 32,
      trim: true,
    },
    lastName: {
      type: String,

      maxlength: 32,
      trim: true,
    },
    email: {
      type: String,
      require: "true",
      trim: "true",
      unique: "true",
    },
    ency_password: {
      type: String,
      required: "true",
    },
    userInfo: {
      type: String,
    },
    salt: String,
    role: {
      type: Number,
      default: 0,
    },
    phoneNumber: {
      type: Number,
    },
    purchases: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);
userSchema
  .virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = uuidv1();
    this.ency_password = this.securePassword(password);
  })
  .get(function () {
    return this._password;
  });

userSchema.methods = {
  authenticate: function (plainpassword) {
    return this.securePassword(plainpassword) === this.ency_password;
  },
  securePassword: function (plainpassword) {
    if (!plainpassword) return "";
    try {
      return crypto
        .createHmac("sha256", this.salt)
        .update(plainpassword)
        .digest("hex");
    } catch (error) {
      return "";
    }
  },
};

module.exports = mongoose.model("User", userSchema);
