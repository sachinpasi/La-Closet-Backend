const Product = require("../Models/Product");

exports.updateStock = (req, res, next) => {
  let myOperations = req.body.order.products.map((prod) => {
    return {
      updateOne: {
        filter: { _id: prod._id },
        update: { $inc: { stock: -prod.count, sold: +prod.count } },
      },
    };
  });

  Product.bulkWrite(myOperations, {}, (error, products) => {
    if (error) {
      return res.status(400).json({
        error: {
          message: "BULK OPERATION FAILED",
        },
      });
    }
    next();
  });
};
