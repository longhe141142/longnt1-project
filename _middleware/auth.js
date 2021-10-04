var jwt = require("jsonwebtoken");
const config = require("../_config/config");
const nextErr = require("./handerError");
const { ErrorHandler } = require("./handling/ErrorHandle");
const CustomResponse = require("./response");
const Role = require("../_models/role");
const Role_permision = require("../_models/role_permission");
const Api = require("../_models/api")

module.exports.auth = (req, res, next) => {
  req.user = {
    name: "long",
    age: 12,
  };

  next();
};

const generateAccessToken = (user) => {
  console.log("user", user);
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
    console.log("token", User.token);
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
    console.log("decoded", decoded);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).send(err);
  }
};

module.exports.Authorize = async (router, method, feature) => {
  let user = req.user;
  let { roles } = req.user;
  let canAccess = false;
  let api = await Api.findOne(
    {
      where:{
        router:router,
        method:method,
        feature:feature,
      }
    }
  )

  return (req, res, next) => {
    res.send(api)
  }

  
};
