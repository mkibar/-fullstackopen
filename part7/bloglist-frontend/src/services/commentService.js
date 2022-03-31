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

const getAllComments = (blogId) => {
  const headerConf = getHeaderConfig();
  let url = `${baseUrl}/${blogId}/comments`;
  const request = axios.get(url, headerConf);
  return request
    .then((response) => response.data)
    .catch((error) => console.log("ERROR:", error));
};

const addComment = async (blogId, newObject) => {
  const headerConf = getHeaderConfig();
  let url = `${baseUrl}/${blogId}/comments`;
  const response = await axios.post(url, newObject, headerConf);
  return response.data;
};

const blogsObjects = {
  getAllComments,
  addComment,
};

export default blogsObjects;
