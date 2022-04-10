import React, { useState } from "react";
import blogService from "../services/blogs";
import BlogItem from "./BlogItem";

const Blogs = (props) => {
  //const [blogs, setBlogs] = useState([]);
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [newBlogVisible, setNewBlogVisible] = useState(false);

  // useEffect(() => {
  //   blogService.getAllPosts().then((blogs) => {
  //     setBlogs(blogs);
  //   });
  // }, []);

  const handleCreate = (event) => {
    event.preventDefault();

    if (!title) {
      props.handleMessage({
        message: "Title must not be empty",
        type: "error",
      });
      return;
    }
    if (!author) {
      props.handleMessage({
        message: "Author must not be empty",
        type: "error",
      });
      return;
    }
    if (!url) {
      props.handleMessage({ message: "Url must not be empty", type: "error" });
      return;
    }

    blogService.createPost({ title, author, url }).then((data) => {
      props.blogs.push(data);
      props.setBlogs(props.blogs);

      setAuthor("");
      setTitle("");
      setUrl("");
      props.handleMessage({ message: "New post added.", type: "info" });
    });
  };

  const setBlogItem = (item) => {
    let objIndex = props.blogs.findIndex((e) => e.id === item.id);
    props.blogs[objIndex] = item;
    props.setBlogs(props.blogs);
    props.handleMessage({ message: "Post updated.", type: "info" });
  };

  const deleteBlogItem = (item) => {
    let objIndex = props.blogs.findIndex((e) => e.id === item.id);
    props.blogs.splice(objIndex, 1);
    props.setBlogs(props.blogs);
    props.handleMessage({ message: "Post deleted.", type: "info" });
  };

  const hideWhenVisible = { display: newBlogVisible ? "none" : "" };
  const showWhenVisible = { display: newBlogVisible ? "" : "none" };

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={() => setNewBlogVisible(true)} id="btn-new-post">
          New Post
        </button>
      </div>
      <div style={showWhenVisible}>
        <h2>Create new</h2>
        <form onSubmit={handleCreate}>
          <label>Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            id="i-title"
            placeholder="Enter title"
          />
          <label>Author</label>
          <input
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            id="i-author"
          />
          <label>Url</label>
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            id="i-url"
          />
          <button id="btn-create">Create</button>
          <button onClick={() => setNewBlogVisible(false)}>Cancel</button>
        </form>
      </div>
      <div id="div-blogs">
        {props?.blogs
          ?.sort((a, b) => {
            return b.likes - a.likes;
          })
          .map((blog) => (
            <BlogItem
              key={blog.id}
              blog={blog}
              setBlogItem={setBlogItem}
              deleteBlogItem={deleteBlogItem}
              user={props.user}
            />
          ))}
      </div>
    </div>
  );
};

export default Blogs;

// import React from 'react'
// const Blog = ({blog}) => (
//   <div>
//     {blog.title} {blog.author}
//   </div>
// )

// export default Blog
