const calculateBmi = (height: number, weight: number):string => {
    const result = weight / (Math.pow(height/100, 2));

    if (result < 18.5) {
        return 'Underweight (unhealthy weight)';
    } else if (result >= 18.5 && result <= 24.9) {
        return 'Normal (healthy weight)';
    } else if (result >= 25 && result <= 29.9) {
        return 'Overweight (unhealthy weight)';
    } else {
        return 'Obese (extremely unhealthy weight)';
    }
};

export default calculateBmi;