import patientData from "../data/patients";
import {
  NewPatientModel,
  PatientEntry,
  NonSensitivePatientEntry,
  NewEntry,
  Entry,
} from "../types";
import { v4 } from "uuid";

let patients: PatientEntry[] = patientData;

const getPatients = (): PatientEntry[] => {
  return patients;
};

const findById = (id: string): NonSensitivePatientEntry | undefined => {
  const entry = patients.find((d) => d.id === id);
  return entry;
};

const addPatient = (entry: NewPatientModel): PatientEntry => {
  const newPatientEntry = {
    id: v4(),
    ...entry,
  };
  patients.push(newPatientEntry);
  return newPatientEntry;
};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

// TODO: exeption throw
const checkEntry = (entry: NewEntry): boolean => {
  if (
    !entry.description ||
    !entry.date ||
    !entry.diagnosisCodes ||
    !entry.type
  ) {
    return false;
  }

  switch (entry.type) {
    case "Hospital":
      if (
        !entry.discharge ||
        !entry.discharge.date ||
        !entry.discharge.criteria
      ) {
        return false;
      }
      return true;
    case "HealthCheck":
      if (entry.healthCheckRating === undefined) {
        console.log("healthCheckRating undefined", entry.healthCheckRating);
        return false;
      }
      return true;
    case "OccupationalHealthcare":
      if (
        !entry.sickLeave ||
        !entry.sickLeave.startDate ||
        !entry.sickLeave.endDate
      ) {
        return false;
      }
      return true;
    default:
      return assertNever(entry);
  }
};

const addEntry = (id: string, entry: NewEntry): PatientEntry | null => {
  //TODO: trycatch, throw exception
  console.log("checkEntry Start");
  if (!checkEntry(entry)) {
    return null;
  }
  console.log("checkEntry Success");
  const newEntry = {
    id: v4(),
    ...entry,
  } as Entry;
  const editingPatient = patients.find((p) => p.id === id);
  if (!editingPatient) {
    return null;
  }
  const editedPatient = {
    ...editingPatient,
    entries: editingPatient.entries?.concat(newEntry),
  };
  patients = patients.map((p) => (p.id === id ? editedPatient : p));
  return editedPatient;
};

export default {
  getPatients,
  addPatient,
  findById,
  addEntry,
};
