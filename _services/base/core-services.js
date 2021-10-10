const UserRole = require("../../_models/userRole")

module.exports = class CoreService {
  simpleFunction = () => {
    console.log("simple function from core!");
    return {
      message: "SUCESS",
      status: 200,
    };
  };

  prepareSetRole = (req) => {
    const userId = req.query.userId;
    const roleId = req.query.roleId;
    return {
      userId: userId,
      roleId: roleId,
    };
  };

  getHighestRole = async (userId) => {
    return await UserRole.findAll({
      where: {
        userId: userId,
      },
    })
      .then((data) => {
        return data.map((val) => {
          return val.roleId;
        });
      })
      .then((roles) => {
        return roles.reduce((acc, curr) => {
          return acc < curr ? acc : curr;
        }, roles[0]);
      });
  };
};
