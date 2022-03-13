import React from "react";
import Country from "./Country";

const Results = (props) => {
  const handleClick = (e) => {
    props.handleFilter(e.target.value);
  };

  if (props.countries.length === 1) {
    return (
      <>
        <br />
        <Country country={props.countries[0]} />
      </>
    );
  } else if (props.countries.length > 10) {
    return (
      <>
        <br />
        Too many ({props.countries.length}) matches, specify another filter
      </>
    );
  } else {
    return (
      <ul>
        {props.countries.map((e) => (
          <li key={e.ccn3}>
            {e.name.common}
            <button id={e.name.common} value={e.name.common} onClick={handleClick}>
              Show
            </button>
          </li>
        ))}
      </ul>
    );
  }
};

export default Results;
