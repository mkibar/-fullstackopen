import React from "react";

const Person = ({ person, personDelete }) => {
  return (
    <li>
      {person.name} {person.number} <button onClick={()=> personDelete(person.id)}>Delete</button>
    </li>
  );
};

export default Person;
