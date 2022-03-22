import express = require("express");
const router = express.Router();

import diagnosesService from "../services/diagnosesService";

router.get("/", (_request, response) => {
  return response.status(200).json(diagnosesService.getDiagnoeses());
});

export default router;