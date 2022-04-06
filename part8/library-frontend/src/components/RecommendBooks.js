import { useLazyQuery, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { BOOKS_BY_GENRE, ME } from "../Graphql/queries";

const RecommendBooks = (props) => {
  const [user, setUser] = useState({});
  const resultMe = useQuery(ME);

  useEffect(() => {
    if (!resultMe.loading) {
      console.log("resultMe", resultMe.data.me);
      setUser(resultMe.data.me);
    }
  }, [resultMe]);

  const [getBooks, resultBooks] = useLazyQuery(BOOKS_BY_GENRE);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    console.log("useEffect>getBooks", user);
    if (user && user?.favoriteGenre) {
      getBooks({ variables: { genre: user.favoriteGenre } });
    }
  }, [user, getBooks]);

  useEffect(() => {
    if (!resultBooks.loading) {
      console.log("useEffect>resultBooks", resultBooks);
      setBooks(resultBooks?.data?.allBooks);
    }
  }, [resultBooks]);

  if (!props.show) {
    return null;
  }

  return (
    <div>
      <h2>Recommendation Books</h2>
      <p>Books in your favorite genre <b>{user.favoriteGenre}</b></p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>Author</th>
            <th>Published</th>
          </tr>
          {books?.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
          <tr></tr>
        </tbody>
      </table>
    </div>
  );
};

export default RecommendBooks;
