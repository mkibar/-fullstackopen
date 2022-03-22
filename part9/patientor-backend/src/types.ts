//export type GenderType = "male" | "female" | "other";
export enum GenderType {
  Male = "male",
  Female = "female",
  Other = "other",
}

export interface PatientModel {
  id: string;
  name: string;
  dateOfBirth: string; //TODO: Date
  ssn: string;
  gender: GenderType;
  occupation: string;
}

export type NewPatientModel = Omit<PatientModel, "id">;

/// PatientModel interface sinin üzerine yeni bir tip oluşturulur. Aşağıdaki ssn alanı haricindeki alanların olduğu yeni bir tiptir
export type PatientModelOmit = Omit<PatientModel, "ssn">;

/// PatientModel interface sinin üzerine yeni bir tip oluşturulur. Sadece aşağıda belirtilen alanları içerir
export type PatientModelPick = Pick<
  PatientModel,
  "id" | "name" | "gender" | "dateOfBirth" | "occupation"
>;

export interface DiagnosesModel {
  code: string;
  name: string;
  latin?: string;
}

/// DiagnosesModel interface sinin üzerine yeni bir tip oluşturulur. Aşağıdaki latin alanı haricindeki alanların olduğu yeni bir tiptir
export type DiagnosesModelOmit = Omit<DiagnosesModel, "latin">;
