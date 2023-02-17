const Sequelize = require('sequelize');

const sequelize = new Sequelize('TODO 2', 'root', '', {
  dialect: 'mysql',
  host: 'localhost',
});

module.exports = sequelize;
