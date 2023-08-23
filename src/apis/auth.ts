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
  return {
    isLoggedIn: (res.status == 200),
    isVerified: res.data.isVerified,
  };
};

const getProfile = async () => {
  const res = await api.get("/member")
  if (res.status == 200) {
    return res.data;
  }
  return false;
}

const updateName = async (name: string) => {
  const res = await api.put("/member", { name })
  if (res.status == 200) {
    return res.data;
  }
  return false;
};

export default {
  checkLoggedIn,
  getProfile,
  updateName,
}