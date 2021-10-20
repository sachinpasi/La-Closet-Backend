const User = require("../Models/User");

exports.pushOrderInPurchaseList = (req, res, next) => {
  let purchases = [];
  console.log(req.body);
  req.body?.products?.map((product) => {
    purchases.push({
      _id: product._id,
      name: product.name,
      description: product.description,
      category: product.category,
      quantity: product.quantity,
      amount: req.body.amount,
      transaction_id: req.body.transaction_id,
    });
  });

  //: STORE THIS IN DB

  User.findOneAndUpdate(
    { _id: req.profile._id },
    {
      $push: { purchases: purchases },
    },
    { new: true },
    (error, purchases) => {
      if (error) {
        return res.status(400).json({
          error: {
            message: "Unable To Save Purchase List",
          },
        });
      }
      next();
    }
  );
};
