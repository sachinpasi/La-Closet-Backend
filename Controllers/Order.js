const { Order, ProductCart } = require("../Models/Order");

exports.getOrderById = (req, res, next, id) => {
  Order.findById(id).exec((error, order) => {
    if (error) {
      return res.status(400).json({
        error: {
          message: "No Order In DB",
        },
      });
    }
    req.order = order;
    next();
  });
};

exports.createOrder = (req, res) => {
  req.body.order.user = req.profile;
  const order = new Order(req.body.order);
  order.save((error, order) => {
    if (error) {
      return res.status(400).json({
        error: {
          message: "Failed To Create Order",
        },
      });
    }
    res.json(order);
  });
};

exports.getAllOrders = (req, res) => {
  Order.find()
    .populate("user", "_id name")
    .exec((error, orders) => {
      if (error) {
        return res.status(400).json({
          error: {
            message: "NO Orders Found",
          },
        });
      }

      res.json(orders);
    });
};

//Status Of Orders

exports.updateOrderStatus = (req, res) => {
  Order.update(
    { _id: req.body.orderId },
    { $set: { status: req.body.status } },
    (error, order) => {
      if (error) {
        return res.status(400).json({
          error: {
            message: "Cannot Update Order Status",
          },
        });
      }
      res.json(order);
    }
  );
};

exports.getOrderStatus = (req, res) => {
  res.json(Order.schema.path("status").enumValues);
};
