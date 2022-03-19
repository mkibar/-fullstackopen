interface ExercisesResults {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const parseArgumentsForCalculateExercises = (
  args: Array<string>
): Array<number> => {
  //console.log("parseArgumentsForCalculateExercises",args);
  if (args.length < 4) throw new Error("Not enough arguments");

  const days = Array<number>();
  for (let index = 2; index < args.length; index++) {
    if (!isNaN(Number(args[index]))) {
      days.push(Number(args[index]));
    }
  }
  return days;
};

const calculateExercises = (
  target: number,
  days: Array<number>
): ExercisesResults => {
  let zeroCount = days.filter((e) => e === 0).length;
  let resultObj: ExercisesResults = {
    periodLength: days.length,
    trainingDays: days.filter((e) => e > 0).length,
    success: false,
    rating: 0,
    ratingDescription: "",
    target: target,
    average: days.reduce((a, e) => a + e, 0) / days.length,
  };

  if (resultObj.average >= target) {
    resultObj.success = true;
    resultObj.rating = 3;
    resultObj.ratingDescription = "Perfect";
  } else if (zeroCount === days.length) {
    resultObj.rating = 1;
    resultObj.ratingDescription = "Too bad";
  } else if (resultObj.average < target) {
    resultObj.rating = 2;
    resultObj.ratingDescription = "Not too bad but Could be better";
  } else {
    resultObj.rating = 2;
    resultObj.ratingDescription = "?";
  }

  return resultObj;
};

try {
  const [target, ...days] = parseArgumentsForCalculateExercises(process.argv);
  let result = calculateExercises(target, days);
  console.log(result);
} catch (error: unknown) {
  if (error instanceof Error) {
    console.error(error.message);
  }
}
