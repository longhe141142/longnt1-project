var jwt = require("jsonwebtoken");
const config = require("../_config/config");
const nextErr = require("./handerError");
const { ErrorHandler } = require("./handling/ErrorHandle");
const CustomResponse = require("./response");
const Role = require("../_models/role");
const Role_permision = require("../_models/role_permission");
const Api = require("../_models/api");
const logger = require("../_utils/logger");

module.exports.auth = (req, res, next) => {
  req.user = {
    name: "long",
    age: 12,
  };

  next();
};

const generateAccessToken = (user) => {
  return jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + 6000 * 60,
      data: user,
      // algorithm: 'RS256'
    },
    config.token_secret
  );
};

module.exports.authJWT = (req, res, User) => {
  try {
    User.token = generateAccessToken(User);
    const ret = {
      User: User,
      token: User.token,
    };
    CustomResponse.SendStatus_WithMessage(res, 200, ret);
  } catch (err) {
    // nextErr(new ErrorHandler(404, "generate token failed"), req, res, next);
    console.log("error", err);
  }
};

module.exports.verifyToken = (req, res, next) => {
  const token = req.header("AuthenticateToken");

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, config.token_secret);
    req.user = decoded;
    next();
    return
  } catch (err) {
    res.status(400).send(err);
  }
};

module.exports.Authorize = (router, method, url) => {
  return async (req, res, next) => {
    try {
      let user = req.user.data;
      let { roles } = user;
      let canAccess = false;
      if (checkIfAdmin(roles)) {
        logger.info("Authorized");
        next();
        return;
      } else {
        let api = await Api.findOne({
          where: {
            router: router,
            method: method,
            url: url,
          },
        });

        for (val of roles) {
          let permission = await Role_permision.findOne({
            where: {
              apiId: api.id,
              roleId: val.id,
            },
          });
          if (permission != null || permission != undefined) {
            canAccess = true;
          }
        }

        if (canAccess) {
          next();
          logger.info("Authorized");
          return;
        } else {
          res.send("cant access");
          logger.error("UnAuthorized")
          return
        }
      }
    } catch (error) {
      nextErr(new ErrorHandler(400, "Unauthorized!"), req, res, next);
      console.log(error);
      return;
    }
  };
};

module.exports.IsAdmin = () => {
  return async (req, res, next) => {
    let canAccess = false;
    let user = req.user.data;
    let { roles } = user;
    let Authorize = roles.filter((role) => {
      return role.name === "admin" || role.id === 1;
    });
    if (Authorize.length > 0) {
      canAccess = true;
    }
    if (canAccess) {
      next();
      logger.info("Authorized");
    } else {
      CustomResponse.SendStatus_WithMessage(res, 404, "BAD REQUEST");
    }
  };
};

checkIfAdmin = (roles) => {
  let Authorize = roles.filter((role) => {
    return role.name === "admin" || role.id === 1;
  });
  if (Authorize.length > 0) {
    canAccess = true;
  }
};
