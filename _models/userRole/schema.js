const Sequelize = require("sequelize");

module.exports = {
  id: {
    type: Sequelize.STRING(36),
    allowNull: false,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV1,
  },
  userId: {
    type: Sequelize.STRING(36),
    allowNull: true,
    reference: {
      mode: "user",
      key: "id",
    },
  },
  roleId: {
    type: Sequelize.STRING(45),
    allowNull: true,
    reference: {
      mode: "role",
      key: "id",
    },
  },
};
