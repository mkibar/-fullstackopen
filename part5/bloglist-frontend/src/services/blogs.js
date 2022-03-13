import axios from "axios";

const baseUrl = "http://localhost:3003/api/blog";

let token = null;
const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAllPosts = () => {
  const headerConf = {
    headers: { authorization: token },
  };

  const request = axios.get(baseUrl, headerConf);
  return request
    .then((response) => response.data)
    .catch((error) => console.log("ERROR:", error));
};

const createPost = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const updatePost = (updateObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const request = axios.put(
    `${baseUrl}/${updateObject.id}`,
    updateObject,
    config
  );
  return request.then((response) => response.data);
};

const deletePost = (id) => {
  const config = {
    headers: { Authorization: token },
  };

  const request = axios.delete(`${baseUrl}/${id}`, config);
  return request.then((response) => response.data);
};

const blogsObjects = {
  getAllPosts,
  createPost,
  updatePost,
  deletePost,
  setToken,
};

export default blogsObjects;
