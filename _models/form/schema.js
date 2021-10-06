const Sequelize = require("sequelize");
const date = new Date();
date.setDate(date.getDate() + 2);
module.exports = {
  id: {
    type: Sequelize.STRING(36),
    allowNull: false,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV1,
  },
  receiver: {
    type: Sequelize.STRING(70),
    allowNull: true,
  },
  type: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  userId: {
    type: Sequelize.STRING(36),
    allowNull: true,
    references: {
      model: "user",
      key: "id",
    },
  },
  status: {
    type: Sequelize.STRING(36),
    allowNull: true,
  },
  dueDate: {
    type: Sequelize.DATE,
    allowNull: true,
    defaultValue: date,
  },
 isApproved:{
    type: Sequelize.INTEGER,
     allowNull:true,
    defaultValue:0
  },
  isRejected:{
    type: Sequelize.INTEGER,
    allowNull:true,
    defaultValue:0
  }
};
