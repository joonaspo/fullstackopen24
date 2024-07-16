import { Diagnosis, Discharge, EntryWithoutID, Gender, HealthCheckRating, NewPatientEntry, SickLeave } from "./types";

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const isNumber = (text: unknown): text is number => {
    return typeof text === 'number' || text instanceof Number;
};

const parseDate = (date: unknown): string => {
    if (!isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date ' + date);
    }
    return date;
};

const parseName = (name: unknown): string => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing name ' + name);
    }
    return name;
};

const parseSsn = (ssn: unknown): string => {
    if (!ssn || !isString(ssn)) {
        throw new Error('Incorrect or missing ssn ' + ssn);
    }
    return ssn;
};

const parseOccupation = (occupation: unknown): string => {
    if (!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing occupation ' + occupation);
    }
    return occupation;
};

const isGender = (param: string): param is Gender => {
    return Object.values(Gender).map(v => v.toString()).includes(param);
};

const parseGender = (gender: unknown): Gender => {
    if (!isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect or missing gender ' + gender);
    }
    return gender;
};



export const toNewPatientEntry = (patient: unknown): NewPatientEntry => {
    if (!patient || typeof patient !== 'object') {
        throw new Error('Incorrect or missing data');
    }

    if ( 'name' in patient && 'dateOfBirth' in patient && 'ssn' in patient && 'gender' in patient && 'occupation' in patient ) {
        const newEntry: NewPatientEntry = {
            name: parseName(patient.name),
            dateOfBirth: parseDate(patient.dateOfBirth),
            ssn: parseSsn(patient.ssn),
            gender: parseGender(patient.gender),
            occupation: parseOccupation(patient.occupation),
            entries: []
        };
        return newEntry;
    }
    throw new Error('Incorrect data: missing fields!');
};

const parseDescription = (description: unknown): string => {
    if (!description || !isString(description)) {
        throw new Error('Incorrect or missing description ' + description);
    }
    return description;
};

const isHealthCheck = (param: number): param is HealthCheckRating => {
    return Object.values(HealthCheckRating).map(v => v as number).includes(param);
};

const parseCriteria = (dischargeCriteria: unknown): string => {
    if (!dischargeCriteria || !isString(dischargeCriteria)) {
        throw new Error('Missing info in criteria field');
    }
    return dischargeCriteria;
};

const parseDischarge = (discharge: unknown): Discharge => {
    if (!discharge || typeof discharge !== 'object' 
    || !("date" in discharge) || !("criteria" in discharge)) {
        throw new Error('Incorrect or missing data');
    }
    const newDischarge: Discharge = {
        date: parseDate(discharge.date),
        criteria: parseCriteria(discharge.criteria)
    };
    return newDischarge;
};

const parseHealthCheck = (healthCheckRating: unknown): HealthCheckRating => {
    if (!healthCheckRating || !isNumber(healthCheckRating) || !isHealthCheck(healthCheckRating)) {
        throw new Error(`Incorrect Health Rating: ${healthCheckRating}, should be in the range 0 - 3`);
    }
    return healthCheckRating;
};

const parseSickLeave = (sickLeave: unknown): SickLeave => {
    if (!sickLeave || typeof sickLeave !== 'object'
        || !("startDate" in sickLeave) || !("endDate" in sickLeave)) {
        throw new Error('Incorrect or missing data');
    }
    const newSickLeave: SickLeave = {
        startDate: parseDate(sickLeave.startDate),
        endDate: parseDate(sickLeave.endDate),
    };
    return newSickLeave;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> => {
    if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
        // we will just trust the data to be in correct form
        return [] as Array<Diagnosis['code']>;
    }
    return object.diagnosisCodes as Array<Diagnosis['code']>;
};

export const toNewDiagnoseEntry = (entry: unknown): EntryWithoutID => {
    if (!entry || typeof entry !== 'object' || !("type" in entry)) {
        throw new Error('Incorrect or missing data');
    }
    if (!('date' in entry && 'description' in entry  && 'specialist' in entry)) {
        throw new Error('Incorrect or missing data');
    }

    switch (entry.type) {
        case "Hospital":
            if ('discharge' in entry) {
                const newEntry: EntryWithoutID = {
                    type: entry.type,
                    description: parseDescription(entry.description),
                    date: parseDate(entry.date),
                    specialist: parseName(entry.specialist),
                    discharge: parseDischarge(entry.discharge),
                    diagnosisCodes: parseDiagnosisCodes(entry)
                };
                return newEntry;
            } else {
            throw new Error('Incorrect or missing data'); 
            }
        case "OccupationalHealthcare":
            if ('sickLeave' in entry && 'employerName' in entry) {
                const newEntry: EntryWithoutID = {
                    type: entry.type,
                    description: parseDescription(entry.description),
                    date: parseDate(entry.date),
                    employerName: parseName(entry.employerName),
                    specialist: parseName(entry.specialist),
                    sickLeave: parseSickLeave(entry.sickLeave),
                    diagnosisCodes: parseDiagnosisCodes(entry)
                };
                return newEntry;
            } else {
                throw new Error('Incorrect or missing data'); 
            }
        case "HealthCheck": 
            if ('healthCheckRating' in entry) {
                const newEntry: EntryWithoutID = {
                    type: entry.type,
                    description: parseDescription(entry.description),
                    date: parseDate(entry.date),
                    specialist: parseName(entry.specialist),
                    healthCheckRating: parseHealthCheck(entry.healthCheckRating),
                    diagnosisCodes: parseDiagnosisCodes(entry)
                };
                return newEntry;
            } else {
                throw new Error('Incorrect or missing data'); 
            }
        default:
            throw new Error('Incorrect entry type'); 
    }
};
