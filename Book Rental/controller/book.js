const Books = require('../model/Books');
const User = require('../model/User');
const Rental = require('../model/Rental');
const { request } = require('express');

exports.getBooks = (req, res, next) => {
    Books.findAll().then((books) => {
        if (books.length == 0){   
            return res.status(404).json({
              message: 'Add Some Books First',
            });
          }
        res.status(200).json({
            books,
        });
    });
};


exports.createBook = (req, res, next) => {
    Books.findOne({
        where : {
            ISBN: req.body.ISBN,
        }
    }).then((books) => {
        if (books){
            return res.status(400).json({ message: 'Book Already present' });
        }
        Books.create({
            ISBN: req.body.ISBN,
            name: req.body.name,
            author: req.body.author,
            }).then((result) => {
              res.status(201).json({
                message: 'Book Created Successfully',
              });
            })
        .catch((error) => {
            if(!error.statusCode){
                error.statusCode = 500;
            }
            next(error);
        })    
    })
    }

  exports.book = (req, res, next) => {
    Books.findOne({
        where:{
            Id:req.params.id,
        },
    })
        .then((books) => {
            if(!books){
                return res.status(404).json({
                    message:"Book not found"
                });
            }
//DELETE
            if (req.query.delete){
                Rental.findOne({
                    where: {
                        BookId: books.Id,
                    },
                }).then((rentals) => {
                    User.findOne({
                        where: {
                            Id : rentals.userId,
                        },
                    }). then((user) => {
                        user.quantity -= 1;
                        user.save().then()
                        .catch((error) => {
                            if(!error.statusCode){
                                error.statusCode = 500;
                            }
                            next(error);
                        });
                    })
                    rentals.destroy().then(
                    books.destroy().then((result) => {
                        res.status(200).json({
                        message: 'Book deleted successfully',
                        books,
                    });
                })
                    )
                })
        };

//RETURN        
            if(req.query.return) {
                if (books.isAvailable == true){
                    return res.status(200).json({
                    message: 'Book already returned',
                    });
                }
                User.findOne({
                    where: {
                        Id : req.userId,
                    },
                }). then((user) => {
                    user.quantity -= 1;
                    user.save().then((user)=> {
                    })
                    .catch((error) => {
                        if(!error.statusCode){
                            error.statusCode = 500;
                        }
                        next(error);
                    });
                })
                Rental.findOne({
                    where: {
                        BookId: books.Id,
                    },
                }).then((rentals) => {
                    rentals.destroy().then()
                })
                books.isAvailable = true;
                books.save().then((result) => {
                    res.status(200).json({
                      message: 'Book returned successfully',
                    });
                  });
            }

//RENT
            if(req.query.rent) {
                if (books.isAvailable == false){
                    return res.status(200).json({
                    message: 'Book already rented',
                    });
                }
                User.findOne({
                    where: {
                        Id : req.userId,
                    },
                }). then((user) => {
                    user.quantity += 1;
                    user.save().then()
                    if (user.quantity > 2){
                    return res.status(404).json({
                        message: 'Cannot rent more',
                        });
                    }
                    else{
                    Rental.create().then((rental) => {
                        rental.UserId = req.userId;
                        rental.BookId = books.Id;
                        rental.save().then((result)=>{
                        books.isAvailable = false;
                        books.save().then((result) => {
                        res.status(200).json({
                        message: 'Book rented successfully',
                    });
                        });
                        })
                    })
                    .catch((error) => {
                        if (!error.statusCode) {
                        error.statusCode = 500;
                        }
                        next(error);
                        });
                    }
                })
            }
          })
          .catch((error) => {
            if (!error.statusCode) {
              error.statusCode = 500;
            }
            next(error);
          });

  };


  exports.rented = (req, res, next) => {
        User.findOne({
            where: {
                id: req.params.id,
            }
        })
        .then((user) => {
            user.getBooks().then((books) => {
                res.status(200).json({
                    books,
                  });
            })
        })
    
  }
 