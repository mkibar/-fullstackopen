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
      updatePerson(p); // TODO: p array ise ?
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
    };

    PhoneService.addPerson(newP)
      .then((response) => {
        let newArry = props.persons.concat(response);
        props.setPerson(newArry);

        setNewPerson("");
        setNewPhone("");
        props.showMessage(`Person name added`, "info");
      })
      //.catch((error) => props.showMessage(error.response.data.error, "error"));
      .catch((error) => props.showMessage(error.message, "error"));
  };
  const updatePerson = (updatePers) => {
    //updatePers.number = newPhone;// aşağıdaki şekilde obje kopyalama yapmadan bu satır ile güncelleme yapınca listedeki kayıt da değişiyor
    let np  = {...updatePers};
    np.number = newPhone;
    
    PhoneService.updatePerson(np)
      .then((response) => {
        let updatePersonList = [...props.persons];
        var index = updatePersonList.findIndex((e) => e.name === newPerson);
        if (index !== -1) {
          updatePersonList[index] = response;
        }

        props.setPerson(updatePersonList);

        props.showMessage(`${newPerson} Person updated`, "info");
        setNewPerson("");
        setNewPhone("");
      })
      .catch((error) => {
        props.showMessage(error.message, "error");
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
