/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import diagnoseService from '../services/diagnoses';
import patientsService from '../services/patients';
import { toNewDiagnoseEntry, toNewPatientEntry } from '../utils';
const router = express.Router();

router.get('/api/diagnoses', (_req,res) => {
    res.send(diagnoseService.getDiagnoses());
});

router.get('/api/ping', (_req,res) => {
    console.log('someone pinged here');
    return res.status(200).json('pong');
});

router.get('/api/patients', (_req, res) => {
    res.send(patientsService.getPatients());
});

router.get('/api/patients/:id', (req, res) => {
    const id = req.params.id;
    res.send(patientsService.getPatient(id));
});

router.post('/api/patients', (req,res) => {
    try {
        const newPatient = toNewPatientEntry(req.body);
        const addedPatient = patientsService.addPatient(newPatient);
        res.status(200).json(addedPatient);
    } catch (error: unknown) {
        let errorMessage = 'Something went wrong!';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});

router.post('/api/patients/:id/entries', (req, res) => {
    try {
        const id = req.params.id;
        const newEntry = toNewDiagnoseEntry(req.body);
        const addedEntry = patientsService.addEntry(id, newEntry);
        res.status(200).json(addedEntry);
    } catch (error: unknown) {
        let errorMessage = 'Something went wrong!';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});

export default router;