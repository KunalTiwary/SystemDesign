const User = require('../model/User');

module.exports = (req, res, next) => {
    User.findOne({
        where: {
            id: req.userId,
        },
    }).then((user) => {
        if(user.userRole != "admin"){
            return res.status(404).json({
                message : "not authorized",
            });
        }
        next();
    })
    .catch((error) => {
        if(!error.statusCode){
            error.statusCode = 500;
        }
        next(error);
    })
}
      
  