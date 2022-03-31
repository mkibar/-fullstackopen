import React from "react";
import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

const BlogItemNew = (props) => {
  return (
    <ListGroup.Item>
      <Link to={"/blogs/" + props?.blog.id}> {props?.blog.title}</Link>
    </ListGroup.Item>
  );
};

export default BlogItemNew;
