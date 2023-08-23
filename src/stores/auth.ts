import { defineStore } from "pinia";
import authApi from "../apis/auth";
import memberApi from "../apis/member";

const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      init: false,
      isLoggedIn: false,
      isVerified: false,
      name: '',
      picture: '',
    }
  },
  actions: {
    async checkLoggedIn() {
      const res = await authApi.checkLoggedIn()
      this.init = true;
      if (res.isLoggedIn) {
        this.isLoggedIn = true;
        this.isVerified = res.isVerified;
        if (res.isVerified) {
          this.getProfile();
        }
      } else {
        this.isLoggedIn = false;
      }
      return res;
    },
    async getProfile() {
      const res = await memberApi.getProfile();
      if (res != false) {
        this.name = res.name;
        this.picture = res.picture;
      } else {
        alert('Get Name Error')
      }
    },
    async setName(name: string) {
      const res = await memberApi.updateName(name);
      if (res != false) {
        this.name = name;
      } else {
        alert('Update Name Error')
      }
    },
  },
});

export default useAuthStore;