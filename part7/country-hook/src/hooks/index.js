import { useState, useEffect } from "react";
import countryServices from "../services/countryservice";

export const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

export const useCountry = (name) => {
  const [country, setCountry] = useState(null);

  useEffect(() => {
    if (name !== "") {
      countryServices
        .getCountry(name)
        .then((data) => {
          setCountry(data);
        })
        .catch((error) => {
          console.log("Error-useEffect:", error);
        });
    }
  }, [name]);

  return country;
};
