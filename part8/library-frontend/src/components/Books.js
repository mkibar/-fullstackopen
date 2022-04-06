import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { ALL_BOOKS } from "../Graphql/queries";

const Books = (props) => {
  const result = useQuery(ALL_BOOKS);
  const [allBooks, setAllBooks] = useState([]);
  const [filter, setFilter] = useState("");
  const books =
    filter === ""
      ? allBooks
      : allBooks.filter((b) => b.genres.includes(filter));

  useEffect(() => {
    if (!result.loading) {
      setAllBooks(result.data.allBooks);
    }
  }, [result, allBooks]);

  if (!props.show) {
    return null;
  }

  const getGenres = () => {
    const genres = allBooks.reduce((acc, book) => {
      for (const genre of book.genres) {
        if (!acc.includes(genre)) {
          acc.push(genre);
        }
      }
      return acc;
    }, []);
    return genres.map((genre) => genre);
  };

  return (
    <div>
      <h2>Books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
          <tr></tr>
        </tbody>
      </table>
      <div>
        {getGenres().map((e, i) => (
          <button key={i} onClick={(event) => setFilter(e)}>
            {e}
          </button>
        ))}
        <button onClick={(event) => setFilter("")}> All Genres </button>
      </div>
    </div>
  );
};

export default Books;
