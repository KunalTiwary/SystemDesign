const sequelize = require('../config/database');

const Sequelize = require('sequelize');

const todo = sequelize.define('todo', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },

  todo: {
    type: Sequelize.STRING,
    defaultValue: "my todo",
  },
  isCompleted: {
    type: Sequelize.STRING,
    defaultValue: "False",
  },
});

module.exports = todo;
