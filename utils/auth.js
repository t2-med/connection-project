const jwt = require("jsonwebtoken");
const moment = require("moment");

const createToken = async user => {
  const payload = {
    iat: moment().unix()
  };

  return await jwt.sign(payload, process.env.SECRET_TOKEN, {
    algorithm: "HS256",
    expiresIn: "1h",
    subject: user.email
  });
};

const verifyToken = async token => {
    return await jwt.verify(token, process.env.SECRET_TOKEN);
};

module.exports = { createToken, verifyToken };
