import api from "./base";

const getUsers = async () => {
  const res = await api.get("/dashboard/users")
  if (res.status == 200) {
    return res.data;
  }
  return false;
}

const getStatistics = async () => {
  const res = await api.get("/dashboard/statistics")
  if (res.status == 200) {
    return res.data;
  }
  return false;
}

export default {
  getUsers,
  getStatistics,
}
