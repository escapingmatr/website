<template>
  <div class="the-navigation">
    <div class="nav-container">
      <div class="link-container left">
        <div class="link-wrapper">
          <router-link to="/shop">Shop</router-link>
        </div>
        <div class="link-wrapper">
          <a @click="toggleSearchBar">Search</a>
        </div>
      </div>
      <div class="link-container center">
        <div class="link-wrapper">
          <router-link class="home-logo" to="/"> HOME </router-link>
        </div>
      </div>
      <div class="link-container right">
        <div class="link-wrapper">
          <router-link :to="'/login'">
            {{ 'Login' }}
          </router-link>
        </div>
        <div class="link-wrapper">
          <div class="link-wrapper">
            <router-link :to="'/wishlist'">
              {{ 'Wishlist' }}
            </router-link>
          </div>
        </div>
        <div class="link-wrapper">
          <div class="link-wrapper">
            <router-link :to="'/cart'">
              {{ 'Cart' }}
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
  <SearchBar v-if="isSearchBarVisible" />
  <!-- <router-link to="/shop">Shop</router-link>
        <div>
        <router-link to="/">Home</router-link>
        </div>
        <router-link :to="isLoggedIn ? '/profile' : '/login'">{{
        isLoggedIn ? 'Profile' : 'Login'
        }}</router-link>
        <button @click="handleSignOut" v-if="isLoggedIn">Sign Out</button>
        <router-link to="/cart">Cart</router-link> -->
</template>

<script setup>
***REMOVED*** onMounted, ref } from 'vue';
***REMOVED*** useRouter } from 'vue-router';
***REMOVED*** useAuthStore } from '@/store/auth'; // Import the auth store module
***REMOVED*** auth } from '@/firebase/init'; // Import the initialized auth module
***REMOVED*** onAuthStateChanged, signOut ***REMOVED*** // Import onAuthStateChanged function
***REMOVED*** reactive, computed } from 'vue';
import SearchBar from '@/components/widgets/SearchBar/SearchBar.vue';

const router = useRouter();
const authStore = useAuthStore();
// Use ref to create a reactive variable
const isSearchBarVisible = ref(false);

// Method to toggle search bar visibility
const toggleSearchBar = () => {
  isSearchBarVisible.value = !isSearchBarVisible.value;
***REMOVED***

// const isLoggedIn = ref(false);

// onMounted(() => {
//   onAuthStateChanged(auth, (user) => {
//     if (user) {
//       isLoggedIn.value = true;
//       authStore.setUser(user); // Set the user in the store if logged in
//     } else {
//       isLoggedIn.value = false;
//       authStore.clearUser(); // Clear user in the store if logged out
//     }
//   });
// });

// const handleSignOut = () => {
//   signOut(auth).then(() => {
//     router.push('/');
//   });
// ***REMOVED***
</script>

<style lang="scss" scoped>
.nav-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 90px;
  padding: 0 30px;

  position: fixed;
  top: 0;
  left: 0;
  right: 0;

  background-color: #2c3e50;
  color: white;

  .link-container {
    width: 30%;
    display: flex;
    flex-direction: row;

    &.left {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;

      .link-wrapper {
        margin-right: 20px;
      }
    }

    &.center {
      display: flex;
      flex-direction: row;
      justify-content: center;
    }

    &.right {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;

      .link-wrapper {
        margin-left: 20px;
      }
    }

    .link-wrapper {
      .home-logo {
        font-size: 40px;
      }
    }
  }
}
</style>
