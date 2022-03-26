/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import React from "react";
import { Grid, Button } from "@material-ui/core";
import { Field, Formik, Form, yupToFormErrors } from "formik";
import * as Yup from "yup";

import {
  TextField,
  SelectField,
  HealthCheckOption,
  TypeOption,
} from "../AddPatientModal/FormField";
import { Diagnosis, HealthCheckRating } from "../types";
import { useStateValue } from "../state";
import { DiagnosisSelection } from "./CustomEntryFields";

/*
 * use type Patient, but omit id and entries,
 * because those are irrelevant for new patient object.
 */
//export type EntryFormValues = Omit<HealthCheckEntry, "id">;

export type EntryFormValues = {
  type: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes: Array<Diagnosis["code"]>;
  discharge: {
    date: string;
    criteria: string;
  };
  healthCheckRating: HealthCheckRating;
  sickLeave: {
    startDate: string;
    endDate: string;
  };
};

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const healthCheckOptions: HealthCheckOption[] = [
  { value: HealthCheckRating.CriticalRisk, label: "CriticalRisk" },
  { value: HealthCheckRating.Healthy, label: "Healthy" },
  { value: HealthCheckRating.HighRisk, label: "HighRisk" },
  { value: HealthCheckRating.LowRisk, label: "LowRisk" },
];

const typeOptions: TypeOption[] = [
  { value: "HealthCheck", label: "Health Check" },
  { value: "Hospital", label: "Hospital" },
  { value: "OccupationalHealthcare", label: "Occupational Healthcare" },
];

export const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={{
        specialist: "",
        date: "",
        description: "",
        diagnosisCodes: [""],
        type: "HealthCheck",
        healthCheckRating: HealthCheckRating.LowRisk,
        discharge: {
          date: "",
          criteria: "",
        },
        sickLeave: {
          startDate: "",
          endDate: "",
        },
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required";

        /* // ilk hali bu şekilde idi
        const errors: { [field: string]: string } = {};
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.diagnosisCodes) {
          errors.diagnosisCodes = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.diagnosisCodes || values.diagnosisCodes.length === 0) {
          errors.diagnosisCodes = requiredError;
        }
        return errors;*/
        const dischargeSchema = () => {
          if (values.type === "Hospital") {
            return Yup.object().shape({
              date: Yup.string().required(requiredError),
              criteria: Yup.string().required(requiredError),
            });
          }
          return Yup.object().shape({
            date: Yup.mixed().notRequired(),
            criteria: Yup.mixed().notRequired(),
          });
        };

        const healthCheckSchema = () => {
          if (values.type === "HealthCheck") {
            return Yup.number().required();
          }
          return Yup.mixed().notRequired();
        };

        const sickLeaveSchema = () => {
          if (values.type === "OccupationalHealthcare") {
            return Yup.object().shape({
              startDate: Yup.string().required(requiredError),
              endDate: Yup.string().required(requiredError),
            });
          }
          return Yup.object().shape({
            startDate: Yup.mixed().notRequired(),
            endDate: Yup.mixed().notRequired(),
          });
        };

        const validationSchema = Yup.object().shape({
          type: Yup.string().required(requiredError),
          description: Yup.string().required(requiredError),
          date: Yup.string().required(requiredError),
          specialist: Yup.string().required(requiredError),
          discharge: dischargeSchema(),
          healthCheckRating: healthCheckSchema(),
          sickLeave: sickLeaveSchema(),
        });

        return validationSchema
          .validate(values)
          .then(function () {
            return {};
          })
          .catch(function (err) {
            return yupToFormErrors(err);
          });
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {
        return (
          <Form className="form ui">
            <SelectField label="Type" name="type" options={typeOptions} />
            <Field
              label="Specialist"
              placeholder="specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              label="Description"
              placeholder="description"
              name="description"
              component={TextField}
            />
            <Field
              label="Entry Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            {values.type === "Hospital" && (
              <>
                <Field
                  label="Discharge Date"
                  placeholder="YYYY-MM-DD"
                  name="discharge.date"
                  component={TextField}
                />
                <Field
                  label="Discharge Criteria"
                  placeholder="Criteria"
                  name="discharge.criteria"
                  component={TextField}
                />
              </>
            )}
            {values.type === "HealthCheck" && (
              <>
                <SelectField
                  label="Health Check"
                  name="healthCheckRating"
                  options={healthCheckOptions}
                />
              </>
            )}
            {values.type === "OccupationalHealthcare" && (
              <>
                <Field
                  label="Start of Sick Leave"
                  placeholder="YYYY-MM-DD"
                  name="sickLeave.startDate"
                  component={TextField}
                />
                <Field
                  label="End of Sick Leave"
                  placeholder="YYYY-MM-DD"
                  name="sickLeave.endDate"
                  component={TextField}
                />
              </>
            )}
            <Grid>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: "left" }}
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    float: "right",
                  }}
                  type="submit"
                  variant="contained"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
