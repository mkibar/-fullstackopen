import config from "./src/utils/config";
import patientorRouter from "./src/routes/patientor";
import diagnosesRouter from "./src/routes/diagnoses";
import pingRouter from "./src/routes/ping";
import cors from "cors";

import express from "express";
const app = express();

const allowedOrigins = ["http://localhost:3000"];
const optionsCors: cors.CorsOptions = {
  origin: allowedOrigins,
};
app.use(cors(optionsCors));
app.use(express.json());

const PORT = config.PORT;

app.use("/api/patients", patientorRouter);
app.use("/api/diagnoses", diagnosesRouter);
app.use("/api/ping", pingRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
