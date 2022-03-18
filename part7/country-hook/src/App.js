import { useState } from "react";
import { useField, useCountry } from "./hooks";

const Country = ({ country }) => {
  console.log("Country:", country);
  if (!country) {
    return <div>not found...</div>;
  }
  if(country.length > 0){
    country = country[0];
  }
  return (
    <div>
      <h3>{country.name.common}</h3>
      <div>population {country.population}</div>
      <div>capital {country.capital}</div>
      <img
        src={country.flags.png}
        height="100"
        alt={`flag of ${country.name.common}`}
      />
    </div>
  );
};

const App = () => {
  const nameInput = useField("text");
  const [name, setName] = useState("");
  const country = useCountry(name);

  const fetch = (e) => {
    e.preventDefault();
    setName(nameInput.value);
  };

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button type="submit">Find</button>
      </form>

      <Country country={country} />
    </div>
  );
};

export default App;
