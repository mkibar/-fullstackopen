interface MultiplyValues {
  value1: number;
  value2: number;
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

const calculateBmi = (height: number, weight: number): number => {
  if (height === 0) {
    throw new Error("Height cannot be equal to zero");
  }
  let heightCm = height / 100;
  let result = Math.floor(weight / (heightCm * heightCm));
  return result;
};

try {
  const { value1, value2 } = parseArguments(process.argv);
  let result = calculateBmi(value1, value2);
  if (result < 20) {
    console.log(`${result} - Underweight`);
  } else if (result >= 20 && result <= 24.9) {
    console.log(`${result} - Normal (healthy weight)`);
  } else {
    console.log(`${result} - Overweight`);
  }
} catch (error: unknown) {
  if (error instanceof Error) {
    console.error(error.message);
  }
}
