import axios from "axios";
const baseUrl = "http://localhost:3001/api/persons";

const getAll = () => {
  const request = axios.get(baseUrl,{
    headers: {
       'Content-Type': 'application/json'
    } 
 });
  return request.then((response) => response.data);
};

const addPerson = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => response.data);
};

const deletePerson = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then((response) => response.data);
};

const exportedObject = {
    getAll: getAll,
    addPerson: addPerson,
    deletePerson: deletePerson,
};

export default exportedObject;
