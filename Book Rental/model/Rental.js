const sequelize = require('../config/database');

const Sequelize = require('sequelize');

const DataTypes = Sequelize.DataTypes;
  
const User = sequelize.define('Rental', {
    Id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      }
  });

module.exports = User;