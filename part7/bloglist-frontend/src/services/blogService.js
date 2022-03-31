import axios from "axios";

const baseUrl = "http://localhost:3003/api/blog";

const getHeaderConfig = () => {
  const headerConf = {
    headers: { authorization: "bearer " + getToken() },
  };
  return headerConf;
};

const getToken = () => {
  const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON);
    return user.token;
  }
  return "";
};

const getAllBlogs = () => {
  const headerConf = getHeaderConfig();
  const request = axios.get(baseUrl, headerConf);
  return request
    .then((response) => response.data)
    .catch((error) => console.log("ERROR:", error));
};

const createBlogItem = async (newObject) => {
  const headerConf = getHeaderConfig();

  const response = await axios.post(baseUrl, newObject, headerConf);
  return response.data;
};

const updateBlogItem = (updateObject) => {
  const headerConf = getHeaderConfig();

  const request = axios.put(
    `${baseUrl}/${updateObject.id}`,
    updateObject,
    headerConf
  );
  return request.then((response) => response.data);
};

const deleteBlogItem = (id) => {
  const headerConf = getHeaderConfig();

  const request = axios.delete(`${baseUrl}/${id}`, headerConf);
  return request.then((response) => response.data);
};

const blogsObjects = {
  getAllBlogs,
  createBlogItem,
  updateBlogItem,
  deleteBlogItem,
};

export default blogsObjects;
