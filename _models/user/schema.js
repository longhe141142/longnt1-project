const Sequelize = require("sequelize");

module.exports = {
  id: {
    type: Sequelize.STRING(36),
    allowNull: false,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV1,
  },
  userName: {
    type: Sequelize.STRING(36),
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING(70),
    allowNull: false,
  },
  age: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  email: {
    type: Sequelize.STRING(36),
    allowNull: true,
  },
  phone: {
    type: Sequelize.STRING(36),
    allowNull: true,
  },
  address: {
    type: Sequelize.STRING(36),
    allowNull: true,
  },
  isActive: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  identityNumber: {
    type: Sequelize.STRING(36),
    allowNull: true,
  },
  socialInsurance: {
    type: Sequelize.STRING(36),
    allowNull: true,
  },
  avatar:{
    type: Sequelize.STRING,
    
  }
};
