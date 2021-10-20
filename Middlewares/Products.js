const Product = require("../Models/Product");

exports.updateStock = (req, res, next) => {
  let myOperations = req.body.products.map((product) => {
    console.log(product);
    return {
      updateOne: {
        filter: { _id: product._id },
        update: { $inc: { stock: -product.count, sold: +product.count } },
      },
    };
  });
  Product.bulkWrite(myOperations, {}, (err, product) => {
    if (err) {
      return res.status(400).json({
        error: "bulk operation failed",
      });
    }
    next();
  });
};
