const jwt = require("jsonwebtoken");

const isAuth = async (req, res, next) => {
  let token = req.headers["x-access-token"] || req.headers["authorization"];
  if (token.startsWith("Bearer ")) {
    // token = token.slice(7, token.length);
    token = token.split(" ")[1];
  }
  if (token) {
    return await jwt.verify(token, process.env.SECRET_TOKEN);
  }
};

module.exports = { isAuth };
