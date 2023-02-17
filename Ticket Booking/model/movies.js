const sequelize = require('../config/database');

const Sequelize = require('sequelize');

const Movies = sequelize.define('movies', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },

  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  tickets: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = Movies;
