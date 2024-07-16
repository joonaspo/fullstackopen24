export const isNotNumber = (argument: unknown): boolean => {
    if (typeof argument !== 'number' || isNaN(argument)) {
        throw new Error(`${argument} is not a number!`);
    }
    return false;
};
