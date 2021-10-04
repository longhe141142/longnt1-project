const Sequelize = require("sequelize");

module.exports = {
  id: {
    type: Sequelize.STRING(36),
    allowNull: false,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV1,
  },
  url: {
    type: Sequelize.STRING(70),
    allowNull: false,
  },
  method: {
    type: Sequelize.STRING(35),
    allowNull: true,
  },
  router: {
    type: Sequelize.STRING(45),
    allowNull: false,
  },
  feature: {
    type: Sequelize.STRING(200),
    allowNull: true,
  },
  description: {
    type: Sequelize.STRING(220),
    allowNull: false,
    defaultValue: "",
  },
};
