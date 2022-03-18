import axios from "axios";
import { useState, useEffect } from "react";

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    axios.get(baseUrl).then((response) => setResources(response.data));
  }, [baseUrl]);

  const getAll = async () => {
    const response = await axios.get(baseUrl);
    return response.data;
  };

  const create = async (newObject) => {
    const response = await axios.post(baseUrl, newObject);
    setResources([...resources, response.data]);
  };

  const update = async (id, newObject) => {
    const response = await axios.put(`${baseUrl} /${id}`, newObject);
    return response.data;
  };

  const deleteId = async (id) => {
    const response = await axios.delete(`${baseUrl} /${id}`);
    return response.data;
  };

  const service = {
    getAll,
    create,
    update,
    deleteId,
  };

  return [resources, service];
};

export const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const reset = () => {
    setValue("");
  };

  return {
    type,
    value,
    onChange,
    reset,
  };
};
