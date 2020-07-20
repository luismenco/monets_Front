import axios from "axios";

export default axios.create({
  baseURL: "https://monetsapi.azurewebsites.net/",
  headers: {
    "Content-type": "application/json"
  }
});