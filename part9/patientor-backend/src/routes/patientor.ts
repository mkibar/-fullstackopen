import express = require("express");
const router = express.Router();

import patientService from "../services/patientService";
import toNewPatientEntry from "../services/patientServiceHelper";

router.get("/", (_request, response) => {
  const data = patientService.getPatientsPick();
  //return response.status(200).json(patientService.getPatients());
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
    const newPatientEntry = toNewPatientEntry(req.body);
    
    const addedEntry = patientService.addPatient(newPatientEntry);
    console.log("addedEntry:", addedEntry);

    res.json(addedEntry);
  } catch (error) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
