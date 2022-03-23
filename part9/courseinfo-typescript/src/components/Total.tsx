import { CoursePart } from "../type";

interface TotalProps {
  parts: Array<CoursePart>;
}

const Total = (props: TotalProps) => {
  return (
    <p>
      Number of exercises:
      {props.parts.reduce((a, e) => a + e.exerciseCount, 0)}
    </p>
  );
};

export default Total;
