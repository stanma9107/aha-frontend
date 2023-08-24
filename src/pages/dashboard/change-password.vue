<script setup lang="ts">
import { onMounted, ref } from 'vue';
import useAuthStore from '../../stores/auth';
import router from '../../router';
import member from '../../apis/member';

const auth = useAuthStore()

const oldPassword = ref('')
const newPassword = ref('')
const newPasswordAgain = ref('')

const errorMessage = ref('');

onMounted(async () => {
  if (!auth.init) {
    await auth.checkLoggedIn()
  }
  if (!auth.isLoggedIn || !auth.isVerified) {
    router.push('/');
    return;
  }
})

const changePassword = async () => {
  // check all inputs are not empty
  if (!oldPassword.value || !newPassword.value || !newPasswordAgain.value) {
    alert('Please fill all the fields!')
    return;
  }
  console.log(oldPassword.value, newPassword.value, newPasswordAgain.value)
  // check newPassword & newPasswordAgain is the same
  if (newPassword.value !== newPasswordAgain.value) {
    alert('New password and new password again is not the same!')
    return;
  }
  const isPasswordChange = await member.changePassword(oldPassword.value, newPassword.value, newPasswordAgain.value);
  if (isPasswordChange.isSuccess) {
    alert('Password change success!')
    router.push("/")
    return;
  }
  errorMessage.value = isPasswordChange.message
  return;
}
</script>

<template>
  <div class="w-screen h-screen bg-base-100 flex flex-col items-center justify-center" v-if="auth.init">
    <h1 class="text-3xl pb-2">
      Hello {{ auth.name }}!
    </h1>
    <h2 class="text-lg md:w-2/3 w-5/6 text-center" v-if="auth.canChangePassword">
      Please change your password! Don't forget your password needs to be at least 8 characters long! It must contain at least one uppercase letter, one lowercase letter, one number, and one special character!
    </h2>
    <h2 class="text-lg md:w-2/3 w-5/6 text-center" v-else>
      We're sorry about the inconvenience, but we just open the service to the users that login with Email & Password.
    </h2>
    <div class="md:w-1/2 w-full flex flex-col items-center py-4">
      <div class="alert alert-error my-2 w-2/3" v-if="errorMessage.length > 0">
        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <span>{{ errorMessage }}</span>
      </div>
      <div class="w-2/3 py-1">
        <label class="label">
          <span class="label-text">Please enter your old password</span>
        </label>
        <input type="password" placeholder="Type here" class="input input-bordered w-full" v-model="oldPassword" />
      </div>

      <div class="w-2/3 py-1">
        <label class="label">
          <span class="label-text">Please enter your new password</span>
        </label>
        <input type="password" placeholder="Type here" class="input input-bordered w-full" v-model="newPassword" />
      </div>

      <div class="w-2/3 py-1">
        <label class="label">
          <span class="label-text">Please enter your new password again</span>
        </label>
        <input type="password" placeholder="Type here" class="input input-bordered w-full" v-model="newPasswordAgain" />
      </div>

      <button class="btn btn-error my-1" @click="changePassword">
        Change Password
      </button>
    </div>
  </div>
</template>