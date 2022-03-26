import { State } from "./state";
import { Diagnosis, Patient } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "GET_PATIENT";
      payload: Patient;
    }
  | {
      type: "SET_DIAGNOSIS_LIST";
      payload: Diagnosis[];
    };

export const reducer = (state: State, action: Action): State => {
  console.log("reducer:", action);
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients,
        },
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    case "GET_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,    //bu kısım sonradan eklendi. state.tsx içerisine patient isminde bir değer daha eklenip tutulabilir. o zaman bu satıra gerek kalmaz
          [action.payload.id]: action.payload,
        },
      };
    case "SET_DIAGNOSIS_LIST":
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (memo, diagnose) => ({ ...memo, [diagnose.code]: diagnose }),
            {}
          ),
          ...state.diagnoses,
        },
      };
    default:
      return state;
  }
};

export const addPatient = (payload: Patient): Action => {
  return {
    type: "ADD_PATIENT",
    payload,
  };
};

export const setPatientList = (payload: Patient[]): Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload,
  };
};

export const getPatient = (payload: Patient): Action => {
  return {
    type: "GET_PATIENT",
    payload,
  };
};

export const setDiagnosesList = (payload: Diagnosis[]): Action => {
  return {
    type: "SET_DIAGNOSIS_LIST",
    payload,
  };
};
