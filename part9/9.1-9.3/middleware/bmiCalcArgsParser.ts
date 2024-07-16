import { isNotNumber } from "../isNumber";
import calculateBmi from "../bmiCalculator";

const parseArguments = (args: string[]): {height: number, weight: number} => {
    const heightArgs = args[args.length - 2];
    isNotNumber(heightArgs);
    const height = Number(heightArgs);

    const weightArgs = args[args.length - 1];
    isNotNumber(weightArgs);
    const weight = Number(weightArgs);

    return { height, weight};
};

const { height, weight } = parseArguments(process.argv);
const result = calculateBmi(height, weight);
console.log(result);