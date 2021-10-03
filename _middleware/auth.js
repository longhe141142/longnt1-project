var jwt = require("jsonwebtoken");
const config = require("../_config/config");
const nextErr = require("./handerError");
const { ErrorHandler } = require("./handling/ErrorHandle");
const CustomResponse = require("./response");
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

module.exports.authJWT = (req, res, User, process) => {
  try {
    User.token = generateAccessToken(process);
    CustomResponse.SendStatus_WithMessage(res, 200, User);
  } catch (err) {
    nextErr(new ErrorHandler(404, "generate token failed"), req, res, next);
  }
};

module.exports.verifyToken = (req, res, next) => {
  const token = req.headers("AuthenticateToken");

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, config.token_secret);
    console.log("decoded", decoded);
    req.user = decoded;
    res.status(200).send(decoded);
  } catch (err) {
    res.status(400).send(err);
  }
};
