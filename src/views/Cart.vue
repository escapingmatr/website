<template>
  <div>
    <h2>Cart Items</h2>
    <ul>
      <li v-for="item in cartItems" :key="item.id">{{ item.name }}</li>
    </ul>
  </div>
</template>

<script>
***REMOVED*** ref, watchEffect } from 'vue'; // Import ref and watchEffect
***REMOVED*** useStore } from '@/store/composition';
***REMOVED*** useAuthStore } from '@/store/auth'; // Import the auth store module
***REMOVED*** getAuth ***REMOVED*** // Import getAuth from Firebase

export default {
  setup() {
    const store = useStore();
    const auth = getAuth(); // Get the auth instance
    const bagItems = store.bagItems;

    // Check if user is logged in
    const authStore = useAuthStore(); // Use the auth store module
    const isLoggedIn = ref(auth.currentUser !== null); // Use ref to track auth state

    let cartItems = [];

    // Use watchEffect to react to changes in auth state
    watchEffect(() => {
      if (isLoggedIn.value) {
        // User is logged in, use bag items from Firebase
        cartItems = bagItems;
      } else {
        // User is not logged in, use bag items from local storage
        const localBagItems = localStorage.getItem('bagItems');
        cartItems = localBagItems ? JSON.parse(localBagItems) : [];
      }
    });

    return {
      cartItems,
    ***REMOVED***
  },
***REMOVED***
</script>