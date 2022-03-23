// Deeper Type kullanımı

interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
  description?: string;
}

interface CourseNormalPart extends CoursePartBase {
  //type: "normal";
  name: "Fundamentals" | "Advanced";
}
interface CourseProjectPart extends CoursePartBase {
  //type: "groupProject";
  name: "Using props to pass data";
  groupProjectCount: number;
}
interface CourseRequirementsPart extends CoursePartBase {
  //type: "special";
  name: "Backend development";
  requirements: Array<string>;
}
interface CourseSubmissionPart extends CoursePartBase {
  //type: "submission";
  name: "Deeper type usage";
  exerciseSubmissionLink: string;
}

export type CoursePart =
  | CourseNormalPart
  | CourseProjectPart
  | CourseSubmissionPart
  | CourseRequirementsPart;

// this is the new coursePart variable
export const courseParts: CoursePart[] = [
  {
    name: "Fundamentals",
    exerciseCount: 10,
    description: "This is the leisured course part",
    type: "normal",
  },
  {
    name: "Advanced",
    exerciseCount: 7,
    description: "This is the harded course part",
    type: "normal",
  },
  {
    name: "Using props to pass data",
    exerciseCount: 7,
    groupProjectCount: 3,
    type: "groupProject",
  },
  {
    name: "Deeper type usage",
    exerciseCount: 14,
    description: "Confusing description",
    exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
    type: "submission",
  },
  {
    name: "Backend development",
    exerciseCount: 21,
    description: "Typing the backend",
    requirements: ["nodejs", "jest"],
    type: "special",
  },
];

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

/// Bu kısım yukarıdaki sabit verinin içeriğinin kurallara uygun olup olmadığını kontrol eder.
courseParts.forEach((part) => {
  switch (part.name) {
    case "Fundamentals":
      break;
    case "Advanced":
      break;
    case "Using props to pass data":
      break;
    case "Deeper type usage":
      break;
    case "Backend development":
      break;
    default:
      return assertNever(part as never);
  }
});
