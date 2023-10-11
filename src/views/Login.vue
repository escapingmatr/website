<template>
  <div class="login">
    <h1>Log into your account</h1>
    <p><input type="text" placeholder="Email" v-model="email" /></p>
    <p><input type="password" placeholder="Password" v-model="password" /></p>
    <p v-if="errMsg">{{ errMsg }}</p>
    <div class="buttons">
      <div class="submit">
        <p>
          <button @click="signInWithEmailAndPassword">Submit</button>
        </p>
      </div>
      <div class="google">
        <p>
          <button @click="signInWithGoogle">Sign In With Google</button>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/store/auth';

const email = ref('');
const password = ref('');
const errMsg = ref('');
const router = useRouter();
const authStore = useAuthStore();

const signInWithEmailAndPassword = async () => {
  const success = await authStore.signInWithEmailAndPassword(
    email.value,
    password.value
  );
  if (success) {
    // Redirect or perform any other actions on successful login
    router.push('/'); // Example: Redirect to a dashboard page
  }
};

const signInWithGoogle = async () => {
  const success = await authStore.signInWithGoogle();
  if (success) {
    // Redirect or perform any other actions on successful login
    router.push('/'); // Example: Redirect to a dashboard page
  }
};
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  flex-direction: column;
  // justify-content: center;
  align-items: center;

  .buttons {
    /* Add any button-related styling here */
    display: flex;
    .submit {
      margin: 5px;
    }
    .google {
      margin: 5px;
    }
  }
}
</style>
