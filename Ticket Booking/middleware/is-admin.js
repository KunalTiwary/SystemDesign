const User = require('../model/user');

module.exports = (req, res, next) => {
  User.findByPk(req.userId)
    .then((user) => user.getRoles())
    .then((roles) => {
      for (const role of roles) {
        if (role.name == 'admin') {
          next();
          return;
        }
      }
      const error = new Error('Not Authorized');
      error.statusCode = 403;
      next(error);
    });
};