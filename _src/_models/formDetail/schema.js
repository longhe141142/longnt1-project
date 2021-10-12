const Sequelize = require("sequelize");

module.exports = {
  id: {
    type: Sequelize.STRING(36),
    allowNull: false,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV1,
  },
  formId: {
    type: Sequelize.STRING(45),
    allowNull: true,
    references: {
      model: "form",
      key: "id",
    },
  },
  content: {
    type: Sequelize.STRING(225),
    allowNull: true,
  },
  managerComment: {
    type: Sequelize.STRING(200),
    allowNull: true,
    defaultValue: ""
  },
};
