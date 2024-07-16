import express from 'express';
import calculateBmi from './bmiCalculator';
import { isNotNumber } from './isNumber';
import calculateExercises from './exerciseCalculator';
import { ExerciseReqBody } from './interfaces/interface';

const app = express();
app.use(express.json());
app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const { height, weight} = req.query;
    const parsedHeight = Number(height);
    const parsedWeight = Number(weight);
    try {
        isNotNumber(parsedHeight);
        isNotNumber(parsedWeight);
    } catch (error) {
        return res.status(400).json({error: 'malformatted parameters'});
    }

    const bmi = calculateBmi(parsedHeight,parsedWeight);
    return res.status(200).json({
        weight: weight,
        height: height,
        bmi: bmi
    });
    
});

app.post('/exercises', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const body: ExerciseReqBody = req.body;

    if (!body.target || !body.daily_exercises) {
        return res.status(400).json({
            error: "parameters missing"
        });
    } 
    
    if (typeof body.target !== 'number' || !Array.isArray(body.daily_exercises) || !body.daily_exercises.every(item => typeof item === 'number')) {
        return res.status(400).json({
            error: 'malformatted parameters'
        });
    }

    const result = calculateExercises(body.daily_exercises, body.target);
    return res.status(200).json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}!`);
});