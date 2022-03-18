import axios from "axios";

const baseUrl = "https://restcountries.com/v3.1/name";

const getCountry = (name) => {
  return axios
    .get(baseUrl + `/${name}`)
    .then((response) => {console.log("RESPONSE:",name,response);  return response.data})
    .catch((error) => {console.log("ERROR-getCountry:", error); return null; });
};

const countryServices = {
  getCountry,
};

export default countryServices;
