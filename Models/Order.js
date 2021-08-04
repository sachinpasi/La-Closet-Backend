const moongoose = require("mongoose");
const { ObjectId } = moongoose.Schema;

const ProductCartSchema = new moongoose.Schema({
  product: {
    type: ObjectId,
    ref: "Product",
  },
  name: String,
  count: Number,
  price: Number,
});
const ProductCart = moongoose.model("ProductCart", ProductCartSchema);

const orderSchema = new moongoose.Schema(
  {
    products: [ProductCartSchema],
    transaction_id: {},
    amount: { type: Number },
    address: String,
    status: {
      type: String,
      default: "Recieved",
      enum: ["Cancelled", "Delivered", "Shipped", "Processing", "Recieved"],
    },
    updated: Date,
    user: {
      type: ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Order = moongoose.model("Order", orderSchema);

module.exports = { Order, ProductCart };
