import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import ReactSelect from "react-select";
import { ALL_AUTHORS, UPDATE_AUTHOR } from "../Graphql/queries";

const Authors = (props) => {
  const [born, setBorn] = useState(0);
  const results = useQuery(ALL_AUTHORS);
  const [authors, setAuthors] = useState([]);
  useEffect(() => {
    if (!results.loading) {
      setAuthors(results.data.allAuthors);
    }
  }, [results, authors]);

  const [selectedOption, setSelectedOption] = useState(null);
  const [updateAuthor] = useMutation(UPDATE_AUTHOR, {
    onError: (error) => {
      //setError(error.graphQLErrors[0].message);
      console.log("Error:", error.graphQLErrors);
    },
    update: (store, response) => {
      //updateCacheWith(response.data.addBook);
      console.log("update", response.data.editAuthor);
    },
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const options = authors.map((a) => ({ value: a.name, label: a.name }));

  const handleBirthYear = (event) => {
    event.preventDefault();
    //TODO: validation
    updateAuthor({
      variables: {
        name: selectedOption.value,
        setBornTo: Number(event.target.birthYear.value),
      },
    });

    setSelectedOption(null);
    setBorn("");
  };

  const updateBlock = () => {
    return (
      <>
        <h2>Set birth year</h2>
        <form onSubmit={handleBirthYear}>
          <ReactSelect
            defaultValue={selectedOption}
            onChange={setSelectedOption}
            options={options}
          />
          <input
            type="number"
            name="birthYear"
            value={born}
            onChange={(e) => setBorn(e.target.value)}
          />
          <button>Update author</button>
        </form>
      </>
    );
  };

  if (!props.show) {
    return null;
  }
  if (results.loading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <h2>Authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      {props.token && updateBlock()}
    </div>
  );
};

export default Authors;
