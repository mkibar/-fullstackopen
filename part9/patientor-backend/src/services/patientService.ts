import patientData from "../data/patients";
import {
  NewPatientModel,
  PatientModel,
  PatientModelOmit,
  PatientModelPick,
} from "../types";
import { v4 } from "uuid";

const patients: PatientModel[] = patientData;

/// const getPatients = (): PatientModel[] => {
const getPatients = (): PatientModel[] => {
  return patients;
};

const getPatientsPick = (): PatientModelPick[] => {
  return patients.map(({ id, name, gender, dateOfBirth, occupation }) => ({
    id,
    name,
    gender,
    dateOfBirth,
    occupation,
  }));
};

const getPatientsOmit = (): PatientModelOmit[] => {
  return patients;
};

const findById = (id: string): PatientModelPick | undefined => {
  const entry = patients.find((d) => d.id === id);
  return entry;
};

const addPatient = (entry: NewPatientModel): PatientModel => {
  const newPatientEntry = {
    id: v4(),
    ...entry,
  };
  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getPatients,
  getPatientsPick,
  getPatientsOmit,
  addPatient,
  findById,
};
