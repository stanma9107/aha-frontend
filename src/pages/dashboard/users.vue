<script setup lang="ts">
import { onMounted, ref } from 'vue';
import useAuthStore from '../../stores/auth';
import router from '../../router';
import dashboard from '../../apis/dashboard';

const auth = useAuthStore()
const users = ref()
const statistics = ref()

onMounted(async () => {
  if (!auth.init) {
    await auth.checkLoggedIn()
  }
  if (!auth.isLoggedIn || !auth.isVerified) {
    router.push('/');
    return;
  }
  statistics.value = await dashboard.getStatistics()
  if (statistics.value == false) {
    alert('Error getting statistics')
  }
  users.value = await dashboard.getUsers()
  if (users.value == false) {
    alert('Error getting users')
  }
})

const goWelcome = () => {
  router.push('/');
}
</script>

<template>
  <div class="w-screen h-screen bg-base-100 flex flex-col items-center justify-center">
    <h1 class="text-2xl pb-2" v-if="statistics">Users Statistics</h1>
    <ol class="pb-4" v-if="statistics">
      <li>Total user have sign up: {{ statistics.signUpCount }}</li>
      <li>Total number of today's active sessions: {{ statistics.todayActiveSession }}</li>
      <li>Average number of active session in last 7 days: {{ statistics.avarageLastSevenDaysActiveSessionRolling }} </li>
    </ol>
    <!-- Users Dashboard with each user in a table -->
    <h1 class="text-2xl pb-2" v-if="users">Users Dashboard</h1>
    <div class="grid grid-cols-12 w-11/12 text-center" v-if="users">
      <span class="col-span-2 border">Name</span>
      <span class="col-span-2 border">Source</span>
      <span class="col-span-2 border">Email</span>
      <span class="col-span-2 border">Sign Up</span>
      <span class="col-span-2 border">Last Login</span>
      <span class="col-span-2 border">Login Times</span>
    </div>
    <div class="grid grid-cols-12 w-11/12 text-center" v-if="users" v-for="user in users" :key="user.id" >
      <span class="col-span-2 border">{{  user.name ?? "None"  }}</span>
      <span class="col-span-2 border">{{  user.source  }}</span>
      <span class="col-span-2 border">{{  user.email ?? "None"  }}</span>
      <span class="col-span-2 border">{{  user.created_at  }}</span>
      <span class="col-span-2 border">{{  user.last_login  }}</span>
      <span class="col-span-2 border">{{  user.login_count  }}</span>
    </div>
    <button class="btn btn-primary mt-2" @click="goWelcome">
      Go Back
    </button>
  </div>
</template>