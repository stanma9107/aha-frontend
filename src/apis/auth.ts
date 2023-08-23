import api from "./base";

const checkLoggedIn = async () => {
  const res = await api.get("/auth/check")
  return {
    isLoggedIn: (res.status == 200),
    isVerified: res.data.isVerified,
  };
};

export default {
  checkLoggedIn,
}