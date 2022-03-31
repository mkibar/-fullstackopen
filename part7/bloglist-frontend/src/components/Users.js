import React from "react";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Users = () => {
  const blogs = useSelector((state) => state.blogs); // { id: 1, title: "title", author: "JOHN", url: "url", likes: 0 }
  //console.log("blogs", blogs);
  const newBlogs = blogs.reduce((acc, blog) => {
    (acc[blog["author"]] = acc[blog["author"]] || []).push(blog);
    return acc;
  }, []); // {JOHN: [{id: 1, title: "title", author: "author", url: "url", likes: 0}, {id: 2, title: "title", author: "author", url: "url", likes: 0}]}

  const getUserIdByAuthorName = (author) => {
    const blog = blogs.find((blog) => blog.author === author && blog.user);
    return blog && blog.user ? "/users/" + blog.user.id : "/";
  };

  return (
    <div>
      <h1>Users</h1>
      <div>
        {Object.keys(newBlogs).map((e, i) => (
          <Row key={i} xs="auto">
            <Col style={{ width: "200px" }}>
              <Link to={getUserIdByAuthorName(e)}>{e}</Link>
            </Col>
            <Col className="text-left">{newBlogs[e].length}</Col>
          </Row>
          // <p key={i}>
          //   <Link to={getUserIdByAuthorName(e)}>{e}</Link>-
          //   <b>{newBlogs[e].length}</b>
          // </p>
        ))}
      </div>
    </div>
  );
};

export default Users;
