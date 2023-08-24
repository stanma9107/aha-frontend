import api from "./base";

const getUsers = async () => {
  const res = await api.get("/dashboard/users")
  if (res.status == 200) {
    return res.data;
  }
  return false;
}

export default {
  getUsers,
}
