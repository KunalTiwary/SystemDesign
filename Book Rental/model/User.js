const sequelize = require('../config/database');

const Sequelize = require('sequelize');

const DataTypes = Sequelize.DataTypes;
  
const User = sequelize.define('User', {
    Id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    location: {
      type: DataTypes.STRING,
      defaultValue: "India"
    },
    date: {
      type: DataTypes.DATE,
      defaultValue: Date.now,
    },
    userRole: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    quantity: {
      type: Sequelize.INTEGER,
    }
  });

module.exports = User;