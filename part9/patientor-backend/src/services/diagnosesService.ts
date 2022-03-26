import diagnoesesData from "../data/diagnoeses";
import { DiagnoseEntry } from "../types";

const getDiagnoeses = (): DiagnoseEntry[] => {
  return diagnoesesData.map(({ code, name }) => ({ code, name }));
};

const addDiagnoeses = () => {
  return null;
};

export default {
  getDiagnoeses,
  addDiagnoeses,
};
