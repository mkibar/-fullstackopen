import { GenderType, NewPatientModel } from "../types";
import { isString, parseNotNullString, parseString } from "./servicesHelper";

// Tip dönüşümü Yöntem 1: unknown türünde yeni bir tip/model oluşturulur ve toNewPatientEntry2 ile dönüşüm yapılır
// type Fields = {
//   name: unknown;
//   gender: unknown;
//   occupation: unknown;
//   ssn: unknown;
//   dateOfBirth: unknown;
// };
// const toNewPatientEntry2 = ({
//   name,
//   gender,
//   occupation,
//   ssn,
//   dateOfBirth,
// }: Fields): NewPatientModel => {
//   const newEntry: NewPatientModel = {
//     name: parseString(name),
//     gender: parseGender(gender),
//     occupation: parseString(occupation),
//     ssn: parseString(ssn),
//     dateOfBirth: parseDate(dateOfBirth),
//   };

//   return newEntry;
// };

// Tip dönüşümü Yöntem 2: obje any ile alınır ve derleyici hatası gözardı edilir. object, request.body den gelir
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toNewPatientEntry = (object: any): NewPatientModel => {
  const newEntry: NewPatientModel = {
    name: parseString(object.name),
    gender: parseGender(object.gender),
    occupation: parseNotNullString(object.occupation,"occupation"),
    ssn: parseString(object.ssn),
    dateOfBirth: parseString(object.dateOfBirth), // TODO:parseDate
  };

  return newEntry;
};

export const parseGender = (gender: unknown): GenderType => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect or missing gender: " + gender);
  }
  return gender;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isGender = (param: any): param is GenderType => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(GenderType).includes(param);
};

export default toNewPatientEntry;
