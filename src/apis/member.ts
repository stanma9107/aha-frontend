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

const changePassword = async (oldPassword: string, newPassword: string, newPasswordAgain: string) => {
  const res = await api.post("/member/change-password", { oldPassword, newPassword, newPasswordAgain })
  return {
    isSuccess: (res.status == 200),
    message: res.data.message ?? undefined,
  };
};

export default {
  getProfile,
  updateName,
  changePassword,
}