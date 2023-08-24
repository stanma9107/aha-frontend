import axios from "axios";

const API_URL = "https://aha-api.stanma.dev/";

export default  axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  validateStatus: function (status) {
    return status >= 200 && status < 500;
  },
});