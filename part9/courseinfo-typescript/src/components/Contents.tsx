import { CoursePart } from "../type";
import Part from "./Part";

interface ContentsProps {
  parts: Array<CoursePart>;
}

const Contents = (props: ContentsProps) => {
  return (
    <>
      {props.parts.map((part) => (
        <Part key={part.name} {...part} />
      ))}
    </>
  );
};

export default Contents;
