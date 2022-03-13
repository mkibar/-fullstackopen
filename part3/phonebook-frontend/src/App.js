import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import PhoneService from "./services/PhoneService";
import Person from "./components/Person";
import Message from "./components/Message";

function App() {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState("");
  const [mssg, setMssg] = useState({ message: "", mt: "" });

  useEffect(() => {
    PhoneService.getAll()
      .then((response) => setPersons(response))
      .catch((error) => ShowMessage("Get error:" + error, "error"));
  }, []);

  const personDelete = (id) => {
    PhoneService.deletePerson(id)
      .then((response) => {
        let newPersonList = [...persons];
        var index = newPersonList.findIndex((e) => e.id === id);
        if (index !== -1) {
          newPersonList.splice(index, 1);
        }
        setPersons(newPersonList);
        ShowMessage("Person deleted", "info");
      })
      .catch((error) => ShowMessage("Get error:" + error, "error"));
  };

  const ShowMessage = (msg, mt) => {
    setMssg({ message: msg, mt: mt });
    setTimeout(() => {
      setMssg({ message: "", type: "" });
    }, 5000);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilter={setFilter} />

      <Message message={mssg} />
      <PersonForm
        persons={persons}
        setPerson={setPersons}
        showMessage={ShowMessage}
      />

      <h3>Numbers</h3>
      <ul>
        {persons
          .filter((f) => f.name?.toLowerCase().includes(filter.toLowerCase()))
          .map((e) => (
            <Person key={e.id} person={e} personDelete={personDelete} />
          ))}
      </ul>
    </div>
  );
}

export default App;
