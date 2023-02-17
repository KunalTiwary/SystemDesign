const Sequelize = require('sequelize');

const sequelize = new Sequelize('Ticket Booking', 'root', '', {
  dialect: 'mysql',
  host: 'localhost',
});

module.exports = sequelize;
