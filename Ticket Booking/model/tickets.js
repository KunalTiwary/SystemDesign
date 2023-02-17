const sequelize = require('../config/database');

const Sequelize = require('sequelize');

const Tickets = sequelize.define('tickets', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },

});

module.exports = Tickets;
