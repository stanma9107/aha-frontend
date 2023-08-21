import axios from "axios";

const API_URL = "http://localhost:3000/";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  validateStatus: function (status) {
    return status >= 200 && status < 500;
  },
});

const checkLoggedIn = async () => {
  const res = await api.get("/auth/check")
  if (res.status == 200) {
    return true;
  }
  return false;
};

export default {
  checkLoggedIn,
}