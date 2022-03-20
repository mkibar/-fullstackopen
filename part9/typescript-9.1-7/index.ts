import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  try {
    if (req.query.height === undefined || req.query.weight === undefined) {
      res.status(400).json("{error:'Malformatted parameters'}");
    }

    let height = Number(req.query.height);
    let weight = Number(req.query.weight);

    if (isNaN(height) || isNaN(weight)) {
      res.status(400).json("{error:'Malformatted parameter values'}");
    }

    let result = calculateBmi(height, weight);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json("{error:'Malformatted parameters'}");
  }
});

app.post("/exercises", (req, res) => {
  console.log("exercises", req.body);
  try {
    const { daily_exercises, target } = req.body;
    if (!daily_exercises || !target || isNaN(Number(target))) {
      return res.status(400).send("{error:'Malformatted parameters'}");
    }

    const result = calculateExercises(target, daily_exercises);

    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json(`{error:'${error}'}`);
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
