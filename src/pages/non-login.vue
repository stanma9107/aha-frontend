<script setup lang="ts">
const goLogin = () => {
  window.location.href = (import.meta.env.DEV) ? 'http://localhost:3000/auth/login' : 'https://aha-api.stanma.dev/auth/login'
}
</script>

<template>
  <div class="w-screen h-screen bg-base-100 flex items-center justify-center">
    <div class="w-1/3 h-fit flex flex-col items-center">
      <h1 class="text-2xl">
        Get Started
      </h1>
      <div class="flex flex-row space-x-4 py-2">
        <button class="btn btn-primary" @click="goLogin">
          Login
        </button>
        <button class="btn">
          Sign-Up
        </button>
      </div>
    </div>
  </div>
</template>