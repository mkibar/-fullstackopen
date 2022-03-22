export const parseString = (str: unknown, fieldName = "field"): string => {
  if (!str || !isString(str)) {
    throw new Error("Incorrect or missing " + fieldName);
  }

  return str;
};

export const parseNotNullString = (str: unknown, fieldName = "field"): string => {
  if (!isString(str)) {
    throw new Error("Incorrect or missing " + fieldName);
  }

  return str;
};

export const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

export const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date: " + date);
  }
  return date;
};

export const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};
