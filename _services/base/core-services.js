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
};
