import { isNotNumber } from "../isNumber";
import calculateExercises from "../exerciseCalculator";

const parseArguments = (args: string[]): {dailyExerciseHours: number[], target: number} => {
    const dailyExerciseHours = args.slice(2,-1).map(arg => {
        isNotNumber(arg);
        return Number(arg);
    });
    
    const targetArg = args[args.length - 1]; 
    isNotNumber(targetArg);
    const target = Number(targetArg);
    
    return { dailyExerciseHours, target};
};

const { dailyExerciseHours, target } = parseArguments(process.argv);
const result = calculateExercises(dailyExerciseHours, target);
console.log(result);
