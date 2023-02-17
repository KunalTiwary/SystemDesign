const Product = require('../model/product');
const { validationResult } = require('express-validator');
const { Op } = require('sequelize');


exports.getProducts = (req, res, next) => {
  // to view limited items per page
  let totalItems;
  let page = req.query.page || 1; // || is or
  let limit = 5;
  // this code is for getting all the values between ACTUAL min and max cost (as found below) with limit per page
  // if we want only the mincost or maxcost as specified by the user see riya's code. It is clean but it does not set any limit.
  // [op.gte] is greater than equal to and [op.lte] is less than equal to 

  let minCost = req.query.minCost || Number.MIN_VALUE;
  let maxCost = req.query.maxCost || Number.MAX_VALUE;
  
  return Product.findAll({
    where: {
      cost: {
        [Op.gte]: minCost,
        [Op.lte]: maxCost,
      },
    },
    limit: limit,
    offset: (page - 1) * limit,
  }).then((products) => {
    res.status(200).json({
      products,
    });
  });
};


exports.getProduct = (req, res, next) => {
  Product.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      if (!product) {
        return res.status(404).json({
          message: 'product not found',
        });
      }
      res.status(200).json({
        product,
      });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    });
};


exports.deleteProduct = (req, res, next) => {
  Product.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      if (!product) {
        return res.status(404).json({
          message: 'product not found',
        });
      }
      product.destroy().then((result) => {
        res.status(200).json({
          message: 'product deleted successfully',
        });
      });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    });
};


exports.updateProduct = (req, res, next) => {
  Product.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      if (!product) {
        return res.status(404).json({
          message: 'product not found',
        });
      }
      product.name = req.body.name;
      product.description = req.body.description;
      product.cost = req.body.cost;
      product.save().then((result) => {
        res.status(200).json({
          message: 'product updated successfully',
          product,
        });
      });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    });
};


exports.createProduct = (req, res, next) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    errors = errors.array();
    if (errors[0].param == 'name') {
      return res.status(400).json({ message: 'name cannot be empty' });
    }
  }
  Product.create({
    name: req.body.name,
    description: req.body.description,
    cost: req.body.cost,
    categoryId: req.body.categoryId,
  }).then((result) => {
    res.status(201).json({
      message: 'product Created Successfully',
    });
  });
};
