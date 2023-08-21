import { defineStore } from "pinia";

const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      isLoggedIn: false,
    }
  },
  actions: {
    login() {
      this.isLoggedIn = true;
    },
    logout() {
      this.isLoggedIn = false;
    },
  }
});

export default useAuthStore;