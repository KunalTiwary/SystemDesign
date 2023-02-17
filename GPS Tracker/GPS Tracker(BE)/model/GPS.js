const sequelize = require('../config/database');

const Sequelize = require('sequelize');

const DataTypes = Sequelize.DataTypes;
  
const GPS = sequelize.define('GPS', {
    Id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
    DeviceId: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    DeviceType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    LatestLocation: {
      type: DataTypes.STRING,
      allowNull: false
    },
  });

module.exports = GPS;