import api from "./base";

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
  getProfile,
  updateName,
}