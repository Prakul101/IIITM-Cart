const { Product } = require("../models");
const formidable = require("formidable");
const fs = require("fs");
const _ = require("lodash");

exports.getProductByID = (req, res, next, id) =>
  Product.findById(id)
    .select("-__v -createdAt")
    .populate("category", "name")
    .exec((e, prod) => {
      if (e) {
        console.log(e);
        return res
          .status(500)
          .json({ error: "Unable to fetch product from Database" });
      } else if (!prod)
        return res.status(400).json({ error: "Product not found" });
      else req.product = prod;
      next();
    });

exports.createProduct = (req, res) => {
  let form = new formidable.IncomingForm({ keepExtensions: true });
  form.parse(req, (e, fields, file) => {
    if (e) {
      console.log(e);
      return res
        .status(400)
        .json({ error: "Error occurred while reading the image" });
    }

    const { name, description, price, category, quantity } = fields;
    if (
      !name ||
      !description ||
      !price ||
      !category ||
      !quantity ||
      !file.image
    )
      return res.status(400).json({ error: "Please include all fields" });

    if (file.image.size > 2000000)
      return res.status(400).json({ error: "File size must be under 2MB" });

    let product = new Product(fields);
    product.image.data = fs.readFileSync(file.image.path);
    product.image.contentType = file.image.type;

    product.save((er, prod) => {
      if (er) {
        console.log(er);
        return res.status(500).json({
          error: "Error occurred during saving the product",
        });
      }
      return res.json({ message: "Product created successfully" });
    });
  });
};

exports.getProduct = (req, res) => {
  req.product.image = undefined;
  return res.json(req.product);
};

exports.getImage = (req, res, next) => {
  if (req.product.image.data) {
    res.set("Content-Type", req.product.image.contentType);
    return res.send(req.product.image.data);
  }
  next();
};

exports.updateProduct = (req, res) => {
  let form = new formidable.IncomingForm({ keepExtensions: true });
  form.parse(req, (e, fields, file) => {
    if (e) {
      console.log(e);
      return res
        .status(400)
        .json({ error: "Error occurred while reading the image" });
    }

    const { name, description, price, category, quantity } = fields;
    if (!name || !description || !price || !category || !quantity)
      return res.status(400).json({ error: "Please include all fields" });

    let prod = req.product;
    prod = _.extend(prod, fields);

    if (file.image) {
      if (file.image.size > 2000000)
        return res.status(400).json({ error: "File size must be under 2MB" });

      prod.image.data = fs.readFileSync(file.image.path);
      prod.image.contentType = file.image.type;
    }

    prod.save((er, prod) => {
      if (er) {
        console.log(er);
        return res.status(500).json({ error: "Failed to update the Product" });
      } else return res.json({ message: "Product updated successfully" });
    });
  });
};

exports.removeProduct = (req, res) => {
  const prod = req.product;
  prod.remove((e, removedProd) => {
    if (e) {
      console.log(e);
      return res.status(500).json({ error: "Failed to remove the Product" });
    } else
      return res.json({
        message: `${removedProd.name} has been removed successfully`,
      });
  });
};

exports.getAllProducts = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 12;
  let sortBy = req.query.sortBy ? req.query.sortBy : "sold";
  let order = req.query.order ? req.query.order : "desc";

  Product.find({})
    .select("-__v -createdAt -image")
    .limit(limit)
    .sort([[sortBy, order]])
    .populate("category", "name")
    .exec((e, products) => {
      if (e) {
        console.log(e);
        return res
          .status(500)
          .json({ error: "Unable to fetch the products from Database" });
      } else if (products.length === 0)
        return res.status(400).json({ error: "No products found" });
      else return res.json(products);
    });
};

exports.updateInventory = (req, res) => {
  const { products } = req.body;
  let ops = products.map((prod) => {
    return {
      updateOne: {
        filter: { _id: prod.id },
        update: { $inc: { quantity: -prod.count, sold: +prod.count } },
      },
    };
  });

  Product.bulkWrite(ops, {}, (e, prodAr) => {
    if (e) {
      console.log(e);
      return res.status(400).json({ error: "Inventory Update Failed" });
    } else
      return res.status(200).json({ message: "Order Placed successfully" });
  });
};
