import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { getPatient, useStateValue } from "../state";
import { Entry, NewEntry, Patient } from "../types";
import PersonIcon from "@material-ui/icons/Person";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import HealingIcon from "@material-ui/icons/Healing";
import DoneOutlineIcon from "@material-ui/icons/DoneOutline";
import { Button } from "@material-ui/core";
import AddEntryModal from "../AddEntryModal";
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";

const PatientPage = () => {
  const { id } = useParams() as { id: string };
  const [{ patients, diagnoses }, dispatch] = useStateValue();

  // patient verisini yeniden al
  useEffect(() => {
    const fetchPatient = async () => {
      if (id === "") {
        console.log("id is null", id);
        return;
      }
      try {
        const { data: patientFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        console.log("patientFromApi", patientFromApi);
        dispatch(getPatient(patientFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    // Hasta listesinde id parametresi ile gelen bir hasta bulunamadı ise veriyi servisten çek
    if (!patients[id]) {
      void fetchPatient();
    }
  }, [dispatch, id, patients]);

  const getEntryTypeIcon = (entry: Entry) => {
    const assertNever = (value: never): never => {
      throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
      );
    };

    switch (entry.type) {
      case "Hospital":
        return <LocalHospitalIcon />;
      case "OccupationalHealthcare":
        return <HealingIcon />;
      case "HealthCheck":
        return <DoneOutlineIcon />;
      default:
        return assertNever(entry);
    }
  };

  const styleEntry = {
    border: "solid",
    borderRadius: "15px",
    padding: "0.5em",
    marginBottom: "10px",
  };

  const [error, setError] = React.useState<string>();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const openModal = (): void => setModalOpen(true);
  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };
  const submitNewEntry = async (values: EntryFormValues) => {
    const newEntry = (): NewEntry => {
      const base = {
        description: values.description,
        date: values.date,
        specialist: values.specialist,
        diagnosisCodes: values.diagnosisCodes,
        type: values.type,
      };
      switch (values.type) {
        case "HealthCheck":
          return {
            ...base,
            healthCheckRating: values.healthCheckRating,
          } as NewEntry;
        case "Hospital":
          return {
            ...base,
            discharge: values.discharge,
          } as NewEntry;
        case "OccupationalHealthcare":
          return {
            ...base,
            sickLeave: values.sickLeave,
          } as NewEntry;
        default:
          // Not supposed to reach this part
          return base as NewEntry;
      }
    };

    try {
      console.log(newEntry());
      const { data: newPatient } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${id}/entries`,
        newEntry()
      );
      dispatch(getPatient(newPatient));
      closeModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data?.error as string);
    }
  };

  const getCustomTypeData = (entry: Entry) => {
    switch (entry.type) {
      case "Hospital":
        return (
          <>
            <p>Discharge Date: {entry.discharge.date}</p>
            <p>Discharge Criteria: {entry.discharge.criteria}</p>
          </>
        );
      case "OccupationalHealthcare":
        return (
          <>
            <p>Sick Leave Start Date: {entry.sickLeave.startDate}</p>
            <p>Sick Leave End Date: {entry.sickLeave.endDate}</p>
          </>
        );
      case "HealthCheck":
        return (
          <>
            <p>Health Check Rating: {Object.values(entry.healthCheckRating)}</p>
          </>
        );
    }
  };

  return (
    <div>
      {patients[id] && (
        <>
          <h1>
            {patients[id]?.name}
            {patients[id].gender === "female" ? (
              <PersonIcon />
            ) : (
              <PersonOutlineIcon />
            )}
          </h1>
          <p>Ssn: {patients[id]?.ssn}</p>
          <p>Occoputation: {patients[id]?.occupation}</p>
          <h1>
            Entries
            <Button variant="contained" onClick={() => openModal()}>
              Add New Patient
            </Button>
          </h1>

          {patients[id].entries &&
            patients[id].entries?.map((e, i) => {
              return (
                <div style={styleEntry} key={i}>
                  <h3>
                    {e.date} {getEntryTypeIcon(e)}
                    <p>{e.description}</p>
                  </h3>
                  {getCustomTypeData(e)}
                  {e.diagnosisCodes?.map((e2, i2) => {
                    return (
                      <li key={i2}>
                        {diagnoses[e2].code} {diagnoses[e2].name}
                      </li>
                    );
                  })}
                  <p>Diagnose by {e.specialist}</p>
                </div>
              );
            })}
        </>
      )}
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
    </div>
  );
};

export default PatientPage;
