const sequelize = require('../config/database');

const Sequelize = require('sequelize');

const DataTypes = Sequelize.DataTypes;
  
const User = sequelize.define('Books', {
    Id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
    ISBN: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false
    },
    publishedOn: {
      type: DataTypes.DATE,
      defaultValue: Date.now,
    },
    AddedOn: {
      type: DataTypes.DATE,
      defaultValue: Date.now,
    },
    isAvailable: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    }
  });

module.exports = User;