import express = require("express");
const router = express.Router();

import patientService from "../services/patientService";
import toNewPatientModel from "../services/patientServiceHelper";
import { NewEntry } from "../types";

router.get("/", (_request, response) => {
  const data = patientService.getPatients();
  return response.status(200).json(data);
});

router.get("/:id", (req, res) => {
  const patient = patientService.findById(req.params.id);

  if (patient) {
    res.status(200).send(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post("/", (req, res) => {
  try {
    const newPatientEntry = toNewPatientModel(req.body);

    const addedPatient = patientService.addPatient(newPatientEntry);

    res.json(addedPatient);
  } catch (error) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.post("/:id/entries", (req, res) => {
  try {
    const newEntry = req.body as NewEntry;
    console.log("req.body", newEntry);
    const addedEntry = patientService.addEntry(req.params.id, newEntry);
    console.log("addedEntry:", addedEntry);

    res.status(200).json(addedEntry);
  } catch (error) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
