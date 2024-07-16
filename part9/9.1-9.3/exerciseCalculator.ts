import { Result } from "./interfaces/interface";

const calculateExercises = (dailyExerciseHours: number[], target: number): Result => {
    const sum = dailyExerciseHours.reduce((a: number, b: number) => a + b,0);
    const average = sum / dailyExerciseHours.length;
    let trainingDays = 0;

    for (let i = 0; i < dailyExerciseHours.length; i++) {
        if (dailyExerciseHours[i] !== 0) {
            trainingDays ++;
        }
    }
    
    let rating: number;
    let ratingDescription: string;

    if (average >= target ) {
        rating = 3;
        ratingDescription = 'Target hours were met, great job!';
    } else if (average >= target * 0.5 ) {
        rating = 2;
        ratingDescription = 'Not too bad but could be better!';
    } else {
        rating = 1;
        ratingDescription = 'You need to work harder!';
    }

    const result = { 
        periodLength: dailyExerciseHours.length,
        trainingDays: trainingDays,
        success: average >= target,
        rating: rating,
        ratingDescription: ratingDescription,
        target: target,
        average: average,
    };
    return result;
};


export default calculateExercises;