const Category = require('../model/category');

exports.getCategories = (req, res, next) => {
    Category.findAll().then((categories) => {
        if (categories.length == 0){   
            return res.status(404).json({
              message: 'Add Some Categories First',
            });
          }
        res.status(200).json({
            categories,
        });
    });
};


exports.getCategory = (req, res, next) => {
    Category.findOne({
        where: {
            id : req.params.id,
        },
    })
    .then((category) => {
        if (!category) {
          return res.status(404).json({
            message: 'Category not found',
          });
        }
        res.status(200).json({
          category,
        });
      })
    .catch((error) => {
        if(!error.statusCode){
            error.statusCode = 500;
        }
        next(error);
    });
};


exports.deleteCategory = (req, res, next) => {
    Category.findOne({
        where: {
        id: req.params.id,
    },
})
    .then((category) => {
        if (!category){
            return res.status(404).json({
                message : "category not found",
            });
        }
    category.destroy().then((result) => {
        res.status(200).json({
          message: 'Category deleted successfully',
        });
      })
    })
        .catch((error) => {
        if(!error.statusCode){
            error.statusCode = 500;
        }
        next(error);
    });
    };

    
exports.updateCategory = (req,res,next) => {
    Category.findOne({
        where:{
            id:req.params.id,
        },
    })
        .then((category) => {
            if(!category){
                return res.status(404).json({
                    message:"category not found"
                });
            }
            category.name = req.body.name;
            category.description = req.body.description;
            category.save().then((result) => {
              res.status(200).json({
                message: 'Category updated successfully',
                category,
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

    
exports.createCategory = (req, res, next) => {
      Category.create({
        name: req.body.name,
        description: req.body.description,
      }).then((result) => {
        res.status(201).json({
          message: 'Category Created Successfully',
        });
      });
    };

