const Product = require("../Models/Product");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");

exports.getProductById = (req, res, next, id) => {
  Product.findById(id)
    .populate("category ")
    .exec((error, product) => {
      if (error) {
        return res.status(400).json({
          error: {
            message: "Product Not Found",
          },
        });
      }
      req.product = product;
      next();
    });
};

exports.createProduct = (req, res) => {
  let form = formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "problem with image",
      });
    }
    // destructure the fields
    const { name, description, category, stock, price } = fields;

    if (!name || !description || !price || !category || !stock) {
      return res.status(400).json({
        error: "please include all fields",
      });
    }

    let product = new Product(fields);

    if (file.photo) {
      if (file.photo.size > 2097152) {
        //2mb in bytes
        return res.status(400).json({
          error: "file is too big",
        });
      }
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }

    // save to the db
    product.save((err, product) => {
      if (err) {
        res.status(400).json({
          error: "saving tee in db fail",
        });
      }
      res.json(product);
    });
  });
};

exports.getProduct = (req, res) => {
  req.product.photo = undefined;
  return res.json(req.product);
};

exports.photo = (req, res, next) => {
  if (req.product.photo.data) {
    res.set("Content-Type", req.product.photo.contentType);
    return res.send(req.product.photo.data);
  }
  next();
};

exports.updateProduct = (req, res) => {
  let form = formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "problem with image",
      });
    }
    // destructure the fields
    const { name, description, category, stock, price } = fields;

    //updation of object
    let product = req.product;
    product = _.extend(product, fields);

    if (file.photo) {
      if (file.photo.size > 2097152) {
        //2mb in bytes
        return res.status(400).json({
          error: "file is too big",
        });
      }
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }

    // save to the db
    product.save((err, product) => {
      if (err) {
        res.status(400).json({
          error: "updation failed",
        });
      }
      res.json(product);
    });
  });
};

exports.deleteProduct = (req, res) => {
  let product = req.product;
  product.remove((error, deletedProduct) => {
    if (error) {
      return res.status(400).json({
        error: {
          message: "Failed To Delete the Product",
        },
      });
    }
    res.json({
      message: "Deleltion was a successfull",
    });
  });
};

//listing the products

exports.getAllProducts = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 8;
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  Product.find()
    .select("-photo")
    .populate("category")
    .sort([[sortBy, "asc"]])
    .limit(limit)
    .exec((error, products) => {
      if (error) {
        return res.status(400).json({
          error: {
            message: "No Product Found",
          },
        });
      }
      res.json(products);
    });
};

exports.getAllUniqueCategories = (req, res) => {
  Product.distinct("category", {}, (error, category) => {
    if (error) {
      return res.status(400).json({
        error: {
          message: "No Category Found",
        },
      });
    }
    res.json(category);
  });
};
