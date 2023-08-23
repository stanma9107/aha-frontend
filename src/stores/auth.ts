import { defineStore } from "pinia";
import authApi from "../apis/auth";

const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      init: false,
      isLoggedIn: false,
      isVerified: false,
      name: '',
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
          this.getName();
        }
      } else {
        this.isLoggedIn = false;
      }
      return res;
    },
    async getName() {
      const res = await authApi.getProfile();
      if (res != false) {
        this.name = res.name;
      } else {
        alert('Get Name Error')
      }
    },
    async setName(name: string) {
      const res = await authApi.updateName(name);
      if (res != false) {
        this.name = name;
      } else {
        alert('Update Name Error')
      }
    },
  },
});

export default useAuthStore;