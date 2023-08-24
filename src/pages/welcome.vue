<script setup lang="ts">
import { onMounted } from 'vue';
import useAuthStore from '../stores/auth';
import router from '../router';
import authApi from '../apis/auth';

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

const goLogout = () => {
  window.location.href = (import.meta.env.DEV) ? 'http://localhost:3000/auth/logout' : 'https://aha-api.stanma.dev/auth/logout'
}

const resendVerification = async () => {
  const resend = await authApi.resendVerificationEmail();
  if (resend.success) {
    alert('Resend verification email success!')
    return;
  }
  alert('Resend verification email failed!')
}

const goUsers = () => {
  router.push('/dashboard/users');
}

const goChangePassword = () => {
  router.push('/dashboard/change-password');
}
</script>

<template>
  <div class="w-screen h-screen bg-base-100 flex items-center justify-center">
    <div class="md:w-1/2 w-2/3 h-fit flex flex-col items-center">
      <img
        class="w-24 rounded-full"
        :src="auth.picture"
        v-if="auth.picture"
      />
      <h1 class="text-2xl" v-if="!auth.init">
        Waiting for check login status...
      </h1>
      <h1 class="text-2xl" v-else-if="!auth.isLoggedIn">
        Please Login First!
      </h1>
      <h1 class="text-2xl" v-else-if="auth.isLoggedIn">
        {{ 
          auth.isVerified ? `Hello ${auth.name}!` : 'Please go to email and check the verification message!'
        }}
      </h1>
      <div class="flex flex-row items-center justify-center space-x-4 py-2" v-if="auth.init">
        <button class="btn" v-if="auth.init && auth.isLoggedIn && auth.isVerified" @click="goUsers">
          Users
        </button>
        <button class="btn" v-if="auth.init && auth.isLoggedIn && !auth.isVerified" @click="resendVerification">
          Resend Verification
        </button>
        <button class="btn" v-if="auth.init && auth.isLoggedIn && auth.canChangePassword" @click="goChangePassword">
          Change Password
        </button>
        <button class="btn btn-neutral" @click="updateName" v-if="auth.isLoggedIn && auth.isVerified">
          Update Name
        </button>
        <button class="btn btn-neutral" @click="goLogout" v-if="auth.isLoggedIn">
          Logout
        </button>
        <button class="btn btn-primary" @click="goLogin" v-if="!auth.isLoggedIn">
          Go Login
        </button>
      </div>
    </div>
  </div>
</template>