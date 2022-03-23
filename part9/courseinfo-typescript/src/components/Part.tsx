import React from "react";
import { CoursePart } from "../type";

const Part = (props: CoursePart) => {
  switch (props.name) {
    case "Advanced":
    case "Fundamentals":
      return (
        <>
          <b>
            {props.name} {props.exerciseCount}
          </b>
          <p>
            <i>{props.description}</i>
          </p>
        </>
      );
    case "Deeper type usage":
      return (
        <>
          <b>
            {props.name} {props.exerciseCount}
          </b>
          <p>
            <i>{props.description}</i>
          </p>
          <p>Submit to {props.exerciseSubmissionLink}</p>
        </>
      );
    case "Using props to pass data":
      return (
        <>
          <b>
            {props.name} {props.exerciseCount}
          </b>
          <p>Project exercises {props.groupProjectCount}</p>
        </>
      );
    case "Backend development":
      return (
        <>
          <b>
            {props.name} {props.exerciseCount}
          </b>
          <p>
            <i>{props.description}</i>
          </p>
          <p>Required skills: {props.requirements.join(", ")}</p>
        </>
      );
  }
};

export default Part;
