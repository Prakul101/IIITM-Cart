const { Category, Product } = require("../models");
const { validationResult } = require("express-validator");
const ObjectId = require("mongoose").Types.ObjectId;

exports.getCategoryByID = (req, res, next, id) => {
  Category.findById(id).exec((e, cat) => {
    if (e) {
      console.log(e);
      return res
        .status(500)
        .json({ error: "Unable to fetch collection from Database" });
    } else if (!cat)
      return res.status(400).json({ error: "Collection not found" });
    else req.category = cat;
    next();
  });
};

exports.createCategory = (req, res) => {
  const err = validationResult(req).array();

  if (err.length === 0) {
    Category.create(req.body, (e, cat) => {
      if (e) {
        console.log(e);
        return res.status(500).json({
          error: "Error occurred during saving the collection in Database",
        });
      } else return res.json({ cat });
    });
  } else return res.status(422).json({ error: err[0].msg });
};

exports.getCategory = (req, res) => res.json(req.category);
exports.getAllCategories = (req, res) => {
  Category.find({})
    .select("-__v")
    .limit(25)
    .sort([["name", "asc"]])
    .exec((e, cat) => {
      if (e) {
        console.log(e);
        return res
          .status(500)
          .json({ error: "Unable to fetch collections from Database" });
      } else if (cat.length === 0)
        return res.status(400).json({ error: "No collections found" });
      else return res.json(cat);
    });
};

exports.updateCategory = (req, res) => {
  const err = validationResult(req).array();

  if (err.length === 0) {
    const cat = req.category;
    cat.name = req.body.name;

    cat.save((e, updatedCat) => {
      if (e) {
        console.log(e);
        return res
          .status(500)
          .json({ error: "Failed to update the collection" });
      } else return res.json(updatedCat);
    });
  } else return res.status(422).json({ error: err[0].msg });
};

exports.removeCategory = (req, res) => {
  const cat = req.category;
  Product.countDocuments({ category: ObjectId(cat._id) }, (e, cnt) => {
    if (e) {
      console.log(e);
      return res.status(500).json({ error: "Failed to remove the collection" });
    } else if (cnt > 0) {
      let msg;
      if (cnt === 1) msg = "A product is still linked to this collection";
      else msg = `${cnt} products are still linked to this collection`;
      return res
        .status(400)
        .json({ error: "Unable to remove the collection\n" + msg });
    } else
      cat.remove((er, removedCat) => {
        if (er) {
          console.log(er);
          return res
            .status(500)
            .json({ error: "Failed to remove the collection" });
        } else
          return res.json({
            message: `${removedCat.name} collection has been removed successfully`,
          });
      });
  });
};
