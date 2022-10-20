const { User, Order } = require("../models");
const { validationResult } = require("express-validator");

exports.getUserByID = (req, res, next, id) => {
  User.findById(id).exec((e, user) => {
    if (e) {
      console.log(e);
      return res
        .status(500)
        .json({ error: "Unable to fetch user from Database" });
    } else if (!user) return res.status(400).json({ error: "User not found" });
    else {
      const { _id, firstName, lastName, email, role } = user;
      req.profile = { _id, firstName, lastName, email, role };
    }
    next();
  });
};

exports.getUser = (req, res) => res.json(req.profile);

exports.updateUser = (req, res) => {
  const err = validationResult(req).array();

  if (err.length === 0)
    User.findByIdAndUpdate(
      req.profile._id,
      { $set: req.body },
      { new: true },
      (e, user) => {
        if (e) {
          console.log(e);
          return res
            .status(500)
            .json({ error: "Failed to update the user details" });
        }
        const { _id, firstName, lastName, email, role } = user;
        return res.json({ _id, firstName, lastName, email, role });
      }
    );
  else {
    let msg = "";
    err.forEach((er) => (msg = msg + "\n" + er.msg));
    return res.status(422).json({ error: msg });
  }
};

exports.getOrders = (req, res) =>
  Order.find({ user: req.profile._id })
    .select(`-__v -user -products -transactionID`)
    .limit(10)
    .populate("user", "_id firstName lastName")
    .exec((e, orders) => {
      if (e) {
        console.log(e);
        return res.status(500).json({
          error: "Unable to fetch orders for current user from Database",
        });
      } else if (orders.length === 0)
        return res.json({ error: "No orders found for the current user" });
      else return res.json(orders);
    });
