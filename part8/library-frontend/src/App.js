import { useApolloClient, useSubscription } from "@apollo/client";
import { useEffect, useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import LoginForm from "./components/LoginForm";
import NewBook from "./components/NewBook";
import Notifications from "./components/Notifications";
import RecommendBooks from "./components/RecommendBooks";
import { ALL_AUTHORS, ALL_BOOKS, BOOK_ADDED } from "./Graphql/queries";
import { updateBookCache } from "./Graphql/updateCache";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState("");
  const [notificationMessage, setNotificationMessage] = useState({});
  const client = useApolloClient();

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded;
      console.log("addedBook", addedBook);
      updateBookCache(client.cache, { query: ALL_BOOKS }, addedBook);
      client.refetchQueries({
        include: [ALL_AUTHORS],
      });
      handleNotification({
        type: "info",
        message: "New book added: " + addedBook.title,
      });
    },
  });

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
    setPage("authors");
    handleNotification({
      type: "info",
      message: "logged out",
    });
  };

  useEffect(() => {
    if (!token) {
      const t = localStorage.getItem("library-user-token");
      if (t) {
        setToken(t);
      }
    }
  }, [token]);

  const handleNotification = (message) => {
    setNotificationMessage(message);
    setTimeout(() => {
      setNotificationMessage({});
    }, 5000);
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>Authors</button>
        <button onClick={() => setPage("books")}>Books</button>
        {token && <button onClick={() => setPage("add")}>Add Book</button>}
        {token && (
          <button onClick={() => setPage("recommend")}>Recommend</button>
        )}
        {token && <button onClick={() => logout()}>Log-out</button>}
        {!token && <button onClick={() => setPage("login")}>Login</button>}
      </div>
      <Notifications notificationMessage={notificationMessage} />

      <Authors show={page === "authors"} token={token} />

      <Books show={page === "books"} />

      <NewBook show={page === "add"} handleHotification={handleNotification} />

      <RecommendBooks show={page === "recommend"} />

      <LoginForm
        show={page === "login"}
        setToken={setToken}
        handleHotification={handleNotification}
        setPage={setPage}
      />
    </div>
  );
};

export default App;
