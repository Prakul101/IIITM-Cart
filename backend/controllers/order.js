const { Order } = require("../models");

exports.getOrder = (req, res) =>
  Order.findById(req.params.orderID)
    .populate("products.product", "name price")
    .exec((e, order) => {
      if (e) {
        console.log(e);
        return res
          .status(500)
          .json({ error: "Unable to fetch order from Database" });
      } else if (!order)
        return res.status(400).json({ error: "Order not found" });
      else return res.json(order);
    });

exports.getAdminOrder = (req, res) =>
  Order.findById(req.params.orderID)
    .populate("user", "firstName lastName email")
    .populate("products.product", "name price")
    .exec((e, order) => {
      if (e) {
        console.log(e);
        return res
          .status(500)
          .json({ error: "Unable to fetch order from Database" });
      } else if (!order)
        return res.status(400).json({ error: "Order not found" });
      else return res.json(order);
    });

exports.getAllOrders = (req, res) => {
  Order.find({})
    .limit(25)
    .select("-__v -transactionID")
    .populate("user", "firstName lastName email")
    .populate("products.product", "name price")
    .exec((e, orders) => {
      if (e) {
        console.log(e);
        return res
          .status(500)
          .json({ error: "Unable to fetch orders from Database" });
      } else if (orders.length === 0)
        return res.json({ message: "No orders found" });
      else return res.json(orders);
    });
};

exports.updateOrder = (req, res) =>
  Order.findByIdAndUpdate(
    req.params.orderID,
    { $set: { status: req.body.status } },
    { new: true },
    (e, order) => {
      if (e) {
        console.log(e);
        return res.status(500).json({ error: "Failed to update the order" });
      } else return res.json(order);
    }
  );
