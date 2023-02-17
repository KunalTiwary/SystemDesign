const sequelize = require('../config/database');

const Sequelize = require('sequelize');

const UserRole = sequelize.define('userRole', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
});

module.exports = UserRole;
