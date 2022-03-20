export {};

interface MultiplyValues {
  value1: number;
  value2: number;
}

interface BmiResult {
  height: number;
  weight: number;
  bmi: string;
}

const parseArguments = (args: Array<string>): MultiplyValues => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

export const calculateBmi = (height: number, weightt: number): BmiResult => {
  if (height === 0) {
    throw new Error("Height cannot be equal to zero");
  }
  let resultString = String("");
  const heightCentimeter = Number(height / 100);
  const bmi = Math.floor(weightt / (heightCentimeter * heightCentimeter));
  if (bmi < 20) {
    resultString = `${bmi} - Underweight`;
  } else if (bmi >= 20 && bmi <= 24.9) {
    resultString = `${bmi} - Normal (healthy weight)`;
  } else {
    resultString = `${bmi} - Overweight`;
  }
  const result: BmiResult = {
    height: heightCentimeter,
    weight: weightt,
    bmi: resultString,
  };
  return result;
};

try {
  const { value1, value2 } = parseArguments(process.argv);
  const result: BmiResult = calculateBmi(value1, value2);
  console.log(result.bmi);
} catch (error: unknown) {
  if (error instanceof Error) {
    console.error(error.message);
  }
}
