export enum GenderType {
  Male = "male",
  Female = "female",
  Other = "other",
}

export interface PatientEntry {
  id: string;
  name: string;
  dateOfBirth: string; //TODO: Date
  ssn: string;
  gender: GenderType;
  occupation: string;
  entries?: Entry[];
}

export type NewPatientModel = Omit<PatientEntry, "id">;

/// PatientModel interface sinin üzerine yeni bir tip oluşturulur. Aşağıdaki ssn alanı haricindeki alanların olduğu yeni bir tiptir
export type NonSensitivePatientEntry = Omit<PatientEntry, "ssn" | "entries">;

/// PatientModel interface sinin üzerine yeni bir tip oluşturulur. Sadece aşağıda belirtilen alanları içerir
//export type PatientModelPick = Pick<PatientEntry,"id" | "name" | "gender" | "dateOfBirth" | "occupation">;

export interface DiagnoseEntry {
  code: string;
  name: string;
  latin?: string;
}

/// DiagnosesModel interface sinin üzerine yeni bir tip oluşturulur. Aşağıdaki latin alanı haricindeki alanların olduğu yeni bir tiptir
//export type DiagnosesModelOmit = Omit<DiagnosesModel, "latin">;

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3,
}

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<DiagnoseEntry["code"]>;
}

// // eslint-disable-next-line @typescript-eslint/no-empty-interface
// export interface EntryModel {
//   //diagnosisCodes?: Array<DiagnosesModel['code']>;
//   id: string;
//   date: string;
//   type: string;
//   specialist: string;
//   diagnosisCodes: string[];
//   description: string;
//   discharge?: Discharge;
//   employerName?: string;
//   sickLeave?: SickLeave;
// }

export interface Discharge {
  date: Date;
  criteria: string;
}

export interface SickLeave {
  startDate: Date;
  endDate: Date;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  sickLeave: SickLeave;
}

export interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: Discharge;
}

export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
type DistributiveOmit<T, K extends keyof any> = T extends any
? Omit<T, K>
: never;

export type NewEntry = DistributiveOmit<Entry, "id">;
