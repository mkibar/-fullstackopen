import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllBlogs, updateBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";
import Comments from "./Comments";

const BlogItemDetail = () => {
  const dispatch = useDispatch();
  const blogId = useParams().id;
  const blogs = useSelector((state) => state.blogs);
  useEffect(() => {
    if (blogs === null || blogs.length === 0) {
      dispatch(getAllBlogs());
    }
  }, []);
  console.log("BlogItemDetail>blogs", blogs);
  let blog = blogs.find((e) => e.id === blogId);
  console.log("BlogItemDetail>blog", blog);
  const handleLike = () => {
    const item = { ...blog };
    item.likes = item.likes ? item.likes + 1 : 1;
    delete item.createDate;

    dispatch(updateBlog(item));
    dispatch(setNotification("Post liked.", "INFORM"));
  };

  if (blog === null || blog === undefined) return null;

  return (
    <div>
      <h1>{blog.title}</h1>
      <a href="#">{blog.url}</a>
      <p>
        Likes: <b className="like-item">{blog.likes}</b>
        <button onClick={handleLike}>Like</button>
      </p>
      <p>
        Added by <b>{blog.author}</b>
      </p>
      <Comments />
    </div>
  );
};

export default BlogItemDetail;
