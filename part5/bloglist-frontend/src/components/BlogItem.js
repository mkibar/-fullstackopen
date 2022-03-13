import React, { useState } from "react";
import blogService from "../services/blogs";
import PropTypes from "prop-types";
import propTypes from "prop-types";

const BlogItem = (props) => {
  const [itemVisible, setItemVisible] = useState(false);
  const hideWhenVisible = { display: itemVisible ? "none" : "" };
  const showWhenVisible = { display: itemVisible ? "" : "none" };
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  //bloğu ekleyen kişi silebilsin
  const deleteButtonStyle = {
    color: "red",
    display: props.blog?.user?.id === props.user?.id ? "" : "none",
  };

  const handleLike = () => {
    const item = { ...props.blog };
    item.likes = item.likes ? item.likes + 1 : 1;
    delete item.createDate;

    blogService.updatePost(item).then((data) => {
      props.setBlogItem(data);
    });
  };

  const handleDelete = () => {
    if (window.confirm("Do you really want to delete?")) {
      blogService.deletePost(props.blog.id).then(() => {
        props.deleteBlogItem(props.blog);
      });
    }
  };

  return (
    <div style={blogStyle}>
      {props.blog.title}
      <button
        style={hideWhenVisible}
        onClick={() => setItemVisible(!itemVisible)}
      >
        View
      </button>
      <button
        style={showWhenVisible}
        onClick={() => setItemVisible(!itemVisible)}
        className="togglableContent"
      >
        Hide
      </button>

      <div style={showWhenVisible}>
        <p>{props.blog.url}</p>
        <p>
          Likes: <b className="like-item">{props.blog.likes}</b>{" "}
          <button onClick={handleLike}>Like</button>
        </p>
        <p>{props.blog.author} </p>
        <button
          style={deleteButtonStyle}
          onClick={handleDelete}
          id="b-delete-post"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

BlogItem.propTypes = {
  blog: PropTypes.object.isRequired,
  setBlogItem: PropTypes.func.isRequired,
  deleteBlogItem: propTypes.func.isRequired,
  //buttonLabel: PropTypes.string.isRequired
};

export default BlogItem;
