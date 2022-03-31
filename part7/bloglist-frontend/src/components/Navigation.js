import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { userLogout } from "../reducers/loginReducer";
import { Container, Nav, Navbar } from "react-bootstrap";

const Navigation = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(userLogout());
  };
  const user = useSelector((state) => state.login);

  return (
    <Navbar bg="primary" variant="dark" expand="md">
      <Container fluid>
        <Navbar.Brand href="#">BlogList App</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link as={Link} to="/">
              Blogs
            </Nav.Link>
            <Nav.Link as={Link} to="/users">
              Users
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Logged-in: {user.name}
            <Link to="#" onClick={handleLogout}>
              Logout
            </Link>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
