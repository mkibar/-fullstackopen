import { React, useState } from "react";
import PhoneService from "../services/PhoneService";

const PersonForm = (props) => {
  const [newPerson, setNewPerson] = useState("");
  const [newPhone, setNewPhone] = useState("");

  const handleAdd = (e) => {
    e.preventDefault();
    let p = props.persons.find((e) => e.name === newPerson);
    if (!newPerson) {
      props.showMessage(`Person name is not valid`, "error");
    } else if (p) {
      props.showMessage(`${newPerson} is already added to phonebook`, "error");
    } else {
      addPerson();
    }
  };
  const handlePersonChange = (e) => {
    setNewPerson(e.target.value);
  };
  const handlePhoneChange = (e) => {
    setNewPhone(e.target.value);
  };
  const addPerson = () => {
    let newP = {
      name: newPerson,
      number: newPhone,
      id: props.persons.length + 1,
    };
    PhoneService.addPerson(newP).then((response) => {
      let newArry = props.persons.concat(response);
      props.setPerson(newArry);

      setNewPerson("");
      setNewPhone("");
      props.showMessage(`Person name addded`, "info");
    });
  };

  return (
    <>
      <h3>Add a new</h3>
      <form onSubmit={handleAdd}>
        Name:
        <input
          type="text"
          id="name"
          value={newPerson}
          onChange={handlePersonChange}
        ></input>
        <br />
        Phone:
        <input
          type="text"
          id="phone"
          value={newPhone}
          onChange={handlePhoneChange}
        ></input>
        <br />
        <button id="buttonadd" type="submit" value="Add">
          Add
        </button>
      </form>
    </>
  );
};
export default PersonForm;
