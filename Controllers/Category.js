const Category = require("../Models/Category");

exports.getCategoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, cate) => {
    if (err) {
      return res.status(400).json({
        error: "Category not found in DB",
      });
    }
    req.category = cate;
    next();
  });
};

exports.createCategory = (req, res) => {
  const category = new Category(req.body);
  category.save((err, category) => {
    if (err) {
      return res.status(400).json({
        error: {
          message: "Not Able To Save Category In DB",
        },
      });
    }
    res.json({ category });
  });
};

exports.getACategory = (req, res) => {
  return res.json(req.category);
};

exports.getAllCategory = (req, res) => {
  Category.find().exec((err, categories) => {
    if (err) {
      return res.status(400).json({
        error: "NO categories found",
      });
    }
    res.json(categories);
  });
};

exports.updateCategory = (req, res) => {
  const category = req.category;
  category.name = req.body.name;

  category.save((err, updatedCatgeory) => {
    if (err) {
      return res.status(400).json({
        error: {
          message: "Failed To Upadate Category",
        },
      });
    }
    res.json(updatedCatgeory);
  });
};

exports.deleteCategory = (req, res) => {
  const category = req.category;
  category.remove((err, category) => {
    if (err) {
      return res.status(400).json({
        error: {
          message: "Failed To Delete This Category",
        },
      });
    }
    res.json({
      message: ` ${category} Was Sucessfully Deleted`,
    });
  });
};
