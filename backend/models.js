const mongoose = require("mongoose");
const { v1: uuidV1 } = require("uuid");
const crypto = require("crypto");

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, unique: true },
});

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true, maxlength: 500 },
    price: { type: Number, required: true },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: true,
    },
    image: { data: Buffer, contentType: String },
    quantity: { type: Number, required: true },
    sold: { type: Number, default: 0 },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        product: { type: mongoose.Schema.ObjectId, ref: "Product" },
        count: Number,
      },
    ],
    transactionID: String,
    amount: Number,
    address: String,
    user: { type: mongoose.Schema.ObjectId, ref: "User" },
    status: {
      type: String,
      default: "Placed",
      enum: [
        "Placed",
        "Confirmed",
        "Processing",
        "Shipped",
        "Delivered",
        "Cancelled",
      ],
    },
  },
  { timestamps: true }
);

var userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, unique: true },
    securePass: { type: String, required: true },
    salt: String,
    role: { type: Number, default: 0 },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

userSchema
  .virtual("password")
  .get(function () {
    return this._pass;
  })
  .set(function (pass) {
    this._pass = pass;
    this.salt = uuidV1();
    this.securePass = this.createSecurePassword(pass);
  });

userSchema.methods = {
  authenticate: function (pass) {
    return this.createSecurePassword(pass) === this.securePass;
  },
  createSecurePassword: function (pass) {
    if (!pass) return "";
    try {
      return crypto.createHmac("sha256", this.salt).update(pass).digest("hex");
    } catch (e) {
      return "";
    }
  },
};

const Category = mongoose.model("Category", categorySchema);
const Product = mongoose.model("Product", productSchema);
const Order = mongoose.model("Order", orderSchema);
const User = mongoose.model("User", userSchema);

module.exports = { Category, Product, Order, User };
