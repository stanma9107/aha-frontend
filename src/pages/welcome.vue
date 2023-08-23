<script setup lang="ts">
import { onMounted } from 'vue';
import useAuthStore from '../stores/auth';

const auth = useAuthStore()

onMounted(async () => {
  auth.checkLoggedIn()
})

const updateName = () => {
  const name = prompt('Please enter your name', auth.name) ?? auth.name
  auth.setName(name)
}

const goLogin = () => {
  window.location.href = (import.meta.env.DEV) ? 'http://localhost:3000/auth/login' : 'https://aha-api.stanma.dev/auth/login'
}
</script>

<template>
  <div class="w-screen h-screen bg-base-100 flex items-center justify-center">
    <div class="md:w-1/2 w-2/3 h-fit flex flex-col items-center">
      <h1 class="text-2xl" v-if="!auth.init">
        Waiting for check login status...
      </h1>
      <h1 class="text-2xl" v-else>
        {{ 
          auth.isLoggedIn 
            ? `Hello ${auth.name}!` 
            : 'Please Login First'
        }}
      </h1>
      <div class="flex flex-row items-center justify-center space-x-4 py-2" v-if="auth.init">
        <button class="btn btn-primary" @click="updateName" v-if="auth.isLoggedIn">
          Update Name
        </button>
        <button class="btn btn-primary" @click="goLogin" v-if="!auth.isLoggedIn">
          Go Login
        </button>
      </div>
    </div>
  </div>
</template>