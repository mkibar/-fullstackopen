const jwt = require("jsonwebtoken");
const config = require("./config");

/// custom errror
// class TokenError extends Error {
//   constructor(message) {
//     super(message); // (1)
//     this.name = "TokenError"; // (2)
//   }
// }

module.exports = async (req, res, next) => {
  const tf = req.headers["authorization"];
  if (tf === undefined) {
    //throw new TokenError("Token not found");
    return res.status(401).json({
      error: "Token no found",
    });
  }

  try {
    const token = tf.split(" ")[1];
    const decodedToken = await jwt.verify(token, config.SECRET);
    const userId = decodedToken.id;
    if (!decodedToken.id || (req.user && req.user?.id !== userId)) {
      //throw new TokenError("Token invalid");
      return res.status(401).json({
        error: "Token invalid",
      });
    } else {
      req.user = decodedToken;
      next();
    }
  } catch (error) {
    return res.status(401).json({
      error: error.message,
    });
  }
};
