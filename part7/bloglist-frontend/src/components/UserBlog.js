import React from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

const UserBlog = () => {
  const userId = useParams().id;
  const blogs = useSelector((state) => state.blogs).filter(
    (e) => e.user && e.user.id === userId
  );

  return (
    <div>
      <h1>{blogs && blogs[0].user.name}</h1>
      <h3>Added Blogs</h3>
      <div id="div-blogs">
        {blogs
          ?.sort((a, b) => {
            return b.likes - a.likes;
          })
          .map((blog) => (
            <li key={blog.id}>
              <Link to={"/blogs/" + blog.id}>{blog.title}</Link>
            </li>
          ))}
      </div>
    </div>
  );
};

export default UserBlog;
