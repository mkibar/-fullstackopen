import React, { useState, useEffect } from "react";
import Blogs from "./components/Blogs";
import Notification from "./components/Notification";
import loginService from "./services/login";
import blogService from "./services/blogs";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState({});
  const [blogs, setBlogs] = useState([]);

  // local storage içerisinde kullanıcı bilgisi varsa otomatik giriş yap
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("UserData");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    if (user) {
      blogService.getAllPosts().then((blogss) => {
        setBlogs(blogss);
      });
    }
  }, [user]);

  // giriş işlemlerini kontrol et
  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService({
        username,
        password,
      });

      blogService.setToken(user.token);
      window.localStorage.setItem("UserData", JSON.stringify(user));
      setUser(user);
      setUsername("");
      setPassword("");
      handleMessage({ message: "Wellcome to my blog", type: "info" });
    } catch (exception) {
      handleMessage({ message: "Wrong username or password", type: "error" });
    }
  };

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem("UserData");
  };

  const handleMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage({});
    }, 5000);
  };

  const loginForm = () => {
    return (
      <>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
              id="i-username"
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
              id="i-password"
            />
          </div>
          <button type="submit" id="b-login">
            login
          </button>
        </form>
      </>
    );
  };

  if (user === null) {
    return (
      <div>
        <h2>Login Application</h2>
        <Notification message={message} />
        {loginForm()}
        <br />
        <footer>Designed by mkibar</footer>
      </div>
    );
  }

  return (
    <div>
      <h2>Blogs</h2>
      <div>
        <p>
          <b>{user.name}</b> logged-in
          <button onClick={handleLogout}>Logout</button>
        </p>
        <Notification message={message} />
        <Blogs
          blogs={blogs}
          setBlogs={setBlogs}
          handleMessage={handleMessage}
          user={user}
        />
      </div>
    </div>
  );
};

export default App;
