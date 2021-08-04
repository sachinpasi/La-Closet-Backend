const moongoose = require("mongoose");
const { ObjectId } = moongoose.Schema;

const productSchema = new moongoose.Schema(
  {
    name: {
      type: String,
      trim: "true",
      required: "true",
    },
    description: {
      trim: "true",
      type: String,
      required: "true",
    },
    price: {
      type: Number,
      trim: "true",
      trim: "true",
      required: "true",
    },
    category: {
      type: ObjectId,
      ref: "Category",
      required: "true",
    },
    stock: {
      type: Number,
    },
    sold: {
      type: Number,
      default: 0,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
  },
  { timestamps: true }
);

module.exports = moongoose.model("Product", productSchema);
