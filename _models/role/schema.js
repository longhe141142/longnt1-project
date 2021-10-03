const Sequelize = require("sequelize");

module.exports = {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING(70),
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING(100),
    allowNull: false,
  },
};
