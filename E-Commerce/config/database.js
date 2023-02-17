const Sequelize = require('sequelize');

const sequelize = new Sequelize('ecommerce2', 'root', '', {
  dialect: 'mysql',
  host: 'localhost',
});

module.exports = sequelize;
