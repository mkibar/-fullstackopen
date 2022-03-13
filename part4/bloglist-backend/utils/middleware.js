const logger = require("./logger");
const jwt = require("jsonwebtoken");
const config = require("./config");

const requestLogger = (request, response, next) => {
  logger.info(
    `${request.method} ${request.path} ${request.elapsedTime}-ms }`
    //${JSON.stringify(request.body)
  );

  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).json({
      error: "invalid token",
    });
  } else if (error.name === "TokenExpiredError") {
    return response.status(401).json({
      error: "token expired",
    });
  } else if (error.name === "TokenError") {
    return response.status(401).json({
      error: error.message,
    });
  }

  next(error);
};

const userExtractor = async (req, res, next) => {
  const tf = req.headers["authorization"];
  if (tf === undefined) {
    throw new TokenError("Token not found");
  }

  try {
    const token = tf.split(" ")[1];
    const decodedToken = await jwt.verify(token, config.SECRET);
    const userId = decodedToken.id;
    if (!decodedToken.id || (req.body.userId && req.body.userId !== userId)) {
      return res.status(401).json({
        error: "Token invalid",
      });
    } else {
      req.token = decodedToken;
      next();
    }
  } catch (error) {
    return res.status(401).json({
      error: error.message,
    });
  }
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  userExtractor,
};
