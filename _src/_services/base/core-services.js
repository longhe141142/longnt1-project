const UserRole = require("../../_models/userRole");
const config = require("../../_config/config");
let dataUtils = require("../../_utils/index");
const logger = require("../../_utils/logger");
module.exports = class CoreService {
  formSatus = {
    SUBMITTED: "SUBMITTED",
    NEW: "NEW",
    CLOSED: "CLOSED",
  };

  ManagerAction = {
    APPROVE: "APPROVE",
    REJECT: "REJECT",
  };
  ORDER_ENUM = [
    "asc",
    "desc",
    "ascending",
    "descending",
    "1",
    "-1",
    "ascend",
    "descend",
  ];

  FIELD_ENUM = ["userName", "age", "age", "id", "email"];

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

  preparePaging = (req) => {
    const query = req.query;
    let pageIndex = query.pageIndex || query.page || query.currentPage;
    const size = config.pageLimit;
    let orderBy = query.orderBy || "userName";
    let orderType = query.orderType || config.defautltSort;
    if (!dataUtils.isNumber(pageIndex)) {
      pageIndex = dataUtils.toNumber(pageIndex);
    }

    logger.warn(`order type: ${this.getOrderType(orderType)}`);

    return {
      orderBy: this.getFieldName(orderBy),
      orderType: this.getOrderType(orderType),
      limit: size,
      offset: size * (pageIndex - 1),
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

  getOrderType = (type) => {
    if (!this.ORDER_ENUM.includes(type)) {
      return config.defautltSort;
    } else {
      if (
        type === "1" ||
        type === "asc" ||
        type === "ascending" ||
        type === "ascend"
      ) {
        return "ASC";
      } else {
        return "DESC";
      }
    }
  };

  getFieldName = (orderBy) => {
    if (!this.FIELD_ENUM.includes(orderBy)) {
      return "id";
    } else {
      return orderBy;
    }
  };
};
