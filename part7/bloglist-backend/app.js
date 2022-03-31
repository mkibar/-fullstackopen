const config = require("./utils/config");
const express = require("express");
const app = express();

const cors = require("cors");

const middleware = require("./utils/middleware");
const logger = require("./utils/logger");
const mongoose = require("mongoose");

logger.info("connecting to MongoDB...", process.env.NODE_ENV);
mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connection to MongoDB:", error.message);
  });

app.use(cors());
app.use(express.static("build"));
/// :request.body ifadesini kullanabilmek için eklenniyor. post parametrelerini body içerisinden alır
app.use(express.json());
// var bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({extended : true}));
// app.use(bodyParser.json());

//app.use(middleware.userExtractor);
app.use(middleware.requestLogger);

// ROUTERs- APIs    ////////////////////////////
const blogRouter = require("./controllers/blog");
app.use("/api/blog", blogRouter);

const userRouter = require("./controllers/user");
app.use("/api/user", userRouter);

const loginRouter = require("./controllers/login");
app.use("/api/login", loginRouter);

// testing routerini sadee test parametresi ile çalışmışsa ekle
if (process.env.NODE_ENV === "test") {
  const testingRouter = require("./controllers/testing");
  app.use("/api/testing", testingRouter);
}
/////////////////////////////////////////////////

app.use(middleware.unknownEndpoint); // TODO:? unknownEndpoint olduğunu nasıl anlıyor
app.use(middleware.errorHandler);

module.exports = app;
