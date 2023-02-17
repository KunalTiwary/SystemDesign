const express = require('express');
const sequelize = require('./config/database');
const bodyParser = require('body-parser');
const bookRoutes = require('./routes/book')
const User = require('./model/User');
const Books = require('./model/Books');
const authRoutes = require('./routes/auth');
const Rental = require('./model/Rental');


const app = express();

app.use(bodyParser.json());
app.use(authRoutes);
app.use(bookRoutes);

app.use((error, req, res, next) => {
    res.status(error.statusCode || 500).json({
        message: error.message,
    });
});


User.belongsToMany(Books, { through: Rental });

Books.belongsToMany(User, { through: Rental });


sequelize
  .sync()
  .then((result) => {
    app.listen(2619);
  })
  .catch((err) => console.log(err));
