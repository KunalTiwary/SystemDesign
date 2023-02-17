const Sequelize = require('sequelize');

const sequelize = new Sequelize('Book Rental', 'root', '', {
  dialect: 'mysql',
  host: 'localhost',
});

module.exports = sequelize;
