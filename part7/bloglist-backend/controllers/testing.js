const testingRouter = require("express").Router();
const User = require("../models/user");
const Blog = require("../models/blog");
const auth = require("../utils/auth");

testingRouter.post("/reset", async (request, response) => {
  try {
    var regexp = new RegExp("^test_");
    await Blog.deleteMany({ title: regexp });

    await User.deleteMany({ username: regexp });

    response.status(204).end();
  } catch (error) {
    console.log("ERROR1:", error);
    response.status(401).json({
      error: "Error:" + error,
    });
  }
});

module.exports = testingRouter;
