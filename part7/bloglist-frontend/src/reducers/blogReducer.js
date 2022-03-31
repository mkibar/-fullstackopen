/* eslint-disable indent */
import blogService from "../services/blogService";
import { setNotification } from "./notificationReducer";

const initialState = [];

const sortedBlogs = (blogs) => {
  if (blogs === null || blogs === undefined) return initialState;

  const returnBlogs = blogs.concat();
  return returnBlogs.sort((a, b) => b.likes - a.likes);
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET":
      return sortedBlogs(action.data);

    case "CREATE":
      return sortedBlogs(state.concat(action.data));

    case "UPDATE":
      return sortedBlogs(
        state.map((b) => (b.id === action.data.id ? action.data : b))
      );

    case "REMOVE":
      return sortedBlogs(state.filter((b) => b.id !== action.data.id));

    default:
      return sortedBlogs(state);
  }
};

export const getAllBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAllBlogs();
    dispatch({
      type: "GET",
      data: blogs,
    });
  };
};

export const createBlog = (newObject) => {
  return async (dispatch) => {
    const blog = await blogService.createBlogItem(newObject);
    if (blog) {
      dispatch({
        type: "CREATE",
        data: blog,
      });
    }
  };
};

export const updateBlog = (updateObject) => {
  return async (dispatch) => {
    const blog = await blogService.updateBlogItem(updateObject);
    if (blog) {
      dispatch({ type: "UPDATE", data: blog });
    }
  };
};

export const removeBlog = (removeObject) => {
  return async (dispatch) => {
    try {
      await blogService.deleteBlogItem(removeObject.id);
      dispatch({ type: "REMOVE", data: removeObject });
    } catch (exception) {
      let error = "Failed to delete blog: " + { exception };
      dispatch(setNotification(error, "ERROR"));
    }
  };
};

export default reducer;
