import { React, useEffect, useState } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import Results from "./components/Results";

function App() {
  const [data, setData] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => {
        setData(response.data);
        console.log("useeffect", response.data)
      })
      .catch((error) => console.log(error));
  }, []);

  const handleFilter = (e) => {
    setSearchInput(e);

    if (e !== "") {
      const filteredData = data.filter((item) => {
        return item.name.common.toLowerCase().includes(e.toLowerCase());
      });
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(data);
    }
  };

  return (
    <div>
      <Filter searchInput={searchInput} handleFilter={handleFilter} />
      <Results countries={filteredResults} handleFilter={handleFilter}/>
    </div>
  );
}

export default App;
