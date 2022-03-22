import express = require("express");
const router = express.Router();

router.get("/", (_request, response) => {
  return response.status(200).send("pong");
});

export default router;
