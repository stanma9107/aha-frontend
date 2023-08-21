<script setup lang="ts">
import authApi from '../apis/auth'
import { onMounted } from 'vue';
import useAuthStore from '../stores/auth';

const auth = useAuthStore()

onMounted(async () => {
  const isLoggedIn = await authApi.checkLoggedIn()
  if (!isLoggedIn) {
    auth.logout();
    goLogin()
  } else {
    auth.login();
  }
})

const goLogin = () => {
  window.location.href = (import.meta.env.DEV) ? 'http://localhost:3000/auth/login' : 'https://aha-api.stanma.dev/auth/login'
}
</script>

<template>
  <div class="w-screen h-screen bg-base-100 flex items-center justify-center">
    <div class="w-1/3 h-fit flex flex-col items-center">
      <h1 class="text-2xl">
        Waiting for check login status...
      </h1>
    </div>
  </div>
</template>