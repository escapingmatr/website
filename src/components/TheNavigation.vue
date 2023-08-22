<template>
  <div id="nav">
    <router-link to="/shop">Shop</router-link>
    <router-link to="/">Home</router-link>
    <router-link :to="isLoggedIn ? '/profile' : '/login'">{{
      isLoggedIn ? 'Profile' : 'Login'
    }}</router-link>
    <router-link to="/cart">Cart</router-link>
    <button @click="handleSignOut" v-if="isLoggedIn">Sign Out</button>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/store/auth'; // Import the auth store module
import { auth } from '@/firebase/init'; // Import the initialized auth module
import { onAuthStateChanged } from 'firebase/auth'; // Import onAuthStateChanged function

const router = useRouter();
const isLoggedIn = ref(false);
const authStore = useAuthStore();

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLoggedIn.value = true;
      authStore.setUser(user); // Set the user in the store if logged in
    } else {
      isLoggedIn.value = false;
      authStore.clearUser(); // Clear user in the store if logged out
    }
  });
});

const handleSignOut = () => {
  signOut(auth).then(() => {
    router.push('/');
  });
};
</script>
