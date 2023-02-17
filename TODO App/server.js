const express = require('express');
const sequelize = require('./config/database');
const bodyParser = require('body-parser');
const User = require('./model/user');
const Todo = require('./model/todo');
const authRoutes = require('./routes/auth');
const todoRoutes = require('./routes/todo');

const app = express();

app.use(bodyParser.json());
app.use(authRoutes);
app.use(todoRoutes);

app.use((error, req, res, next) => {
    res.status(error.statusCode || 500).json({
        message: error.message,
    });
});

User.hasMany(Todo);

sequelize
  .sync()
  .then((result) => {
    app.listen(2666);
  })
  .catch((err) => console.log(err));