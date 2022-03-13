import axios from "axios";
import { React, useEffect, useState } from "react";

const Country = ({ country }) => {
  const [weatherData, setWeatherData] = useState({});
  const icon = () => {
    if (weatherData?.weather === undefined || weatherData?.weather[0].icon === undefined) {
      return;
    }
    
    return `http://openweathermap.org/img/wn/${weatherData?.weather[0]?.icon}@2x.png`
  };
  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${country?.capital}&appid=${process.env.REACT_APP_API_KEY}`
      )
      .then((response) => {
        setWeatherData(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>
        <h3>Capital: {country.capital}</h3>
      </div>
      <div>
        <h3>Area: {country.area}</h3>
      </div>
      <div>
        <h3>Languages:</h3>
        <ul>
          {Object.values(country.languages)?.map((e, i) => (
            <li key={i}>{e}</li>
          ))}
        </ul>
      </div>
      <div>
        <img
          src={country.flags.svg}
          style={{ width: 150, height: 100 }}
          alt={country.name}
        ></img>
      </div>

      <div>
        <h1>Weather in {country.capital[0].toUpperCase()}</h1>
        Temperature: {(weatherData?.main?.temp - 273, 15)} Celcius
        <br />
        <img
          src={icon()}
          alt="test"
        />
        <br />
        Wind: {weatherData?.wind?.speed} m/sn
      </div>
    </div>
  );
};

export default Country;
