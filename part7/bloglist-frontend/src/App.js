import React, { useEffect } from "react";
import Blogs from "./components/Blogs";
import Notification from "./components/Notification";
import { useDispatch, useSelector } from "react-redux";
import { userCheck } from "./reducers/loginReducer";
import LoginForm from "./components/LoginForm";
import Footer from "./components/Footer";
import { Route, Routes } from "react-router-dom";
import Users from "./components/Users";
import UserBlog from "./components/UserBlog";
import BlogItemDetail from "./components/BlogItemDetail";
import Navigation from "./components/Navigation";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.login);

  // local storage içerisinde kullanıcı bilgisi varsa otomatik giriş yap
  useEffect(() => {
    dispatch(userCheck());
  }, []);

  if (user === null) {
    return (
      <div>
        <h2>Login Application</h2>
        <Notification />
        <LoginForm />
        <br />
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navigation />
      <Notification />
      <div style={{ padding: "10px" }}>
        <Routes>
          <Route path="/" element={<Blogs />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:id" element={<BlogItemDetail />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<UserBlog />} />
        </Routes>
      </div>
      <br />
      <Footer />
    </div>
  );
};

export default App;
