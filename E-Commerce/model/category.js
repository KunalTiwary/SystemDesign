const sequelize = require('../config/database');

const Sequelize = require('sequelize');

const Category = sequelize.define('category', {
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
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Category;


// module.exports = (sequelize, Sequelize) => {
//     const DataTypes = Sequelize.DataTypes;
//     const Category = sequelize.define('category', {
//         id: {
//           type: Sequelize.INTEGER,
//           autoIncrement: true,
//           allowNull: false,
//           primaryKey: true,
//         },
      
//         name: {
//           type: Sequelize.STRING,
//           allowNull: false,
//         },
//         description: {
//           type: Sequelize.STRING,
//           allowNull: false,
//         },
//       });
//     return User;
//   };
  