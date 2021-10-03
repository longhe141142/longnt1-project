const Sequelize = require("sequelize");

module.exports = {
  id: {
    type: Sequelize.STRING(36),
    allowNull: false,
    primaryKey: true,
    defaultValue:Sequelize.UUIDV1,
  },
  roleId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references:{
        model: "role",
        key:"id"

    }
  },
  apiId: {
    type: Sequelize.STRING(36),
    allowNull: false,
    references:{
        model: "api",
        key:"id"
    }
  },
};
