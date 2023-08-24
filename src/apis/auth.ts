import api from "./base";

const checkLoggedIn = async () => {
  const res = await api.get("/auth/check")
  return {
    isLoggedIn: (res.status == 200),
    isVerified: res.data.isVerified,
  };
};

const resendVerificationEmail = async () => {
  const res = await api.post("/auth/resend")
  return {
    success: (res.status == 200),
  };
}

export default {
  checkLoggedIn,
  resendVerificationEmail,
}