const Sequelize = require("sequelize");

module.exports = {
  id: {
    type: Sequelize.STRING(36),
    allowNull: false,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV1,
  },
  lastName: {
    type: Sequelize.STRING(70),
    allowNull: false,
  },
  fullName: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  userId: {
    type: Sequelize.STRING(36),
    allowNull: false,
    references: {
      model: "user",
      key: "id",
    },
  },
  managerId: {
    type: Sequelize.STRING(36),
    allowNull: true,
  },
};
