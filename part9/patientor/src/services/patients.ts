import patientData from "../../data/patients";
import { Entry, EntryWithoutID, NewPatientEntry, Patient, nonSensitivePatient } from "../types";
import {v4 as uuid} from 'uuid';

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
const createId: string = uuid();

const patients: Patient[] = patientData;

const getPatients = (): nonSensitivePatient[] => {
    return patients;
};

const addPatient = (entry: NewPatientEntry): Patient => {
    const newEntry = {
        id: createId,
        ...entry
    };
    patients.push(newEntry);
    console.log(newEntry);
    return newEntry;
};

const getPatient = (id: string): Patient | undefined => {
    const patient = patients.find(patient => patient.id === id);
    return patient;
};
const addEntry = (id: string, entry: EntryWithoutID): Entry => {
    const patient = patients.find(patient => patient.id === id);
    const newEntry = {
        id: createId,
        ...entry
    };
    patient?.entries.push(newEntry);
    return newEntry;
};

export default { getPatients, addPatient, getPatient, addEntry };