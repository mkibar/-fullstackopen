import diagnoesesData from "../data/diagnoeses";
import { DiagnosesModel } from "../types";

const getDiagnoeses = (): DiagnosesModel[] => {
  return diagnoesesData.map(({ code, name }) => ({ code, name }));
};

const addDiagnoeses = () => {
  return null;
};

export default {
  getDiagnoeses,
  addDiagnoeses,
};
