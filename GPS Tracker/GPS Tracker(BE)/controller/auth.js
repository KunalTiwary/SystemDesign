const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const { Op } = require('sequelize');

// during signup we are giving id, pass, name.
exports.signup = (req, res, next) => {
  let errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) { // basic checking if there is error regarding email or password
    errors = errors.array();
    if (errors[0].param == 'email') {
      return res.status(400).json({ message: 'invalid email' });
    } else if (errors[0].param == 'password') {
      return res
        .status(400)
        .json({ message: 'password should be minimum 5 characters' });
    }
  }
  User.findOne({
    where: {
      email: req.body.email, // checking for the existing user and returning if found one
    },
  }).then((user) => {
    if (user) {
      const error = new Error('Email already exists');
      error.statusCode = 403;
      next(error);
    } else {
      bcrypt.hash(req.body.password, 12).then((hashedPassword) => {
        User.create({
                name: req.body.name,
                password: hashedPassword,
                email: req.body.email,
              }).then((user) => {
                user.save().then((result) => {
                  res.status(201).json({
                    message: 'Sign up successful',
                  });
                });
              })
            .catch((error) => {
              console.log(error);
            });
      });
    }
  });
};
  

exports.login = (req, res, next) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  }).then((user) => {
    if (!user) {
      const error = new Error('Email not found');
      error.statusCode = 404;
      return next(error);
    } else {
      bcrypt.compare(req.body.password, user.password).then((isMatch) => {
        if (isMatch) {
          const token = jwt.sign(
            {
              name: user.name,
              userId: user.Id,
            },
            'cat',
            { expiresIn: '1h' }
          );
          res.status(200).json({
            message: 'Login successful',
            token: token,
          });
        } else {
          const error = new Error('Invalid password');
          error.statusCode = 403;
          next(error);
        }
      });
    }
  });
};
