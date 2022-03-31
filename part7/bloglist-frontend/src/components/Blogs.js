import React, { useEffect, useState } from "react";
import { Button, Col, Form, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createBlog, getAllBlogs } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";
import BlogItemNew from "./BlogItemNew";

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs);
  const dispatch = useDispatch();
  useEffect(() => {
    if (blogs === null || blogs.length === 0) {
      dispatch(getAllBlogs());
    }
  }, []);

  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [newBlogVisible, setNewBlogVisible] = useState(false);

  const handleCreate = (event) => {
    event.preventDefault();

    if (!title) {
      dispatch(setNotification("Title must not be empty", "ERROR"));
      return;
    }
    if (!author) {
      dispatch(setNotification("Author must not be empty", "ERROR"));
      return;
    }
    if (!url) {
      dispatch(setNotification("Url must not be empty", "ERROR"));
      return;
    }

    dispatch(createBlog({ title, author, url }));
    setAuthor("");
    setTitle("");
    setUrl("");
    dispatch(setNotification("New post added.", "INFORM"));
  };

  const hideWhenVisible = { display: newBlogVisible ? "none" : "" };
  const showWhenVisible = { display: newBlogVisible ? "" : "none" };

  return (
    <div>
      <Row>
        <Col>
          <h1>Blogs</h1>
        </Col>
        <Col style={{ textAlign: "right" }}>
          <button
            style={hideWhenVisible}
            className="btn btn-primary"
            onClick={() => setNewBlogVisible(true)}
            id="btn-new-post"
          >
            New Post
          </button>
        </Col>
      </Row>

      <div style={showWhenVisible}>
        <h3>Create new blog post</h3>
        <Form onSubmit={handleCreate}>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="inlineFormInputTitle" visuallyHidden>
              Title
            </Form.Label>
            <Form.Control
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mb-2"
              id="inlineFormInputTitle"
              placeholder="Enter title"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label htmlFor="inlineFormInputUrl" visuallyHidden>
              Url
            </Form.Label>
            <Form.Control
              id="inlineFormInputUrl"
              placeholder="Post Url"
              className="mb-2"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </Form.Group>

          <Row className="mb-3">
            <Col xs={8}>
              <Form.Group as={Col}>
                <Form.Label htmlFor="inlineFormInputAuthorr" visuallyHidden>
                  Author
                </Form.Label>
                <Form.Control
                  id="inlineFormInputAuthorr"
                  placeholder="Author"
                  className="mb-2"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col >
              <Form.Group
                as={Col}
                style={{ textAlign: "right" }}
              >
                <Button type="submit" className="mb-2">
                  Create
                </Button>{" "}
                <Button
                  id="btn-cancel"
                  type="submit"
                  className="mb-2"
                  onClick={(e) => {
                    e.preventDefault();
                    setNewBlogVisible(false);
                  }}
                >
                  Cancel
                </Button>
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </div>
      {/* <div style={showWhenVisible}>
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
      </div> */}

      <ListGroup>
        {blogs
          ?.sort((a, b) => {
            return b.likes - a.likes;
          })
          .map((blog) => (
            <BlogItemNew key={blog.id} blog={blog} />
          ))}
      </ListGroup>
    </div>
  );
};

export default Blogs;
