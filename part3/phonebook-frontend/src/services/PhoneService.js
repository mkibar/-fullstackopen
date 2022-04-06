import axios from "axios";
//const baseUrl = "http://localhost:3001/api/persons";
//const baseUrl = "https://phonebook-backend-001.herokuapp.com/api/persons";
const baseUrl = "/api/persons";

const getAll = () => {
  const request = axios.get(baseUrl, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return request.then((response) => response.data);
};

const addPerson = (newObject) => {
  return axios
    .post(baseUrl, newObject)
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });
};

const updatePerson = (newObject) => {
  return axios
    .put(`${baseUrl}/${newObject.id}`, newObject)
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });
};

const deletePerson = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then((response) => response.data);
};

const exportedObject = {
  getAll: getAll,
  addPerson: addPerson,
  updatePerson: updatePerson,
  deletePerson: deletePerson,
};

export default exportedObject;
