<template>
  <div>
    <h2>Shopping Bag</h2>
    <ul>
      <li v-for="item in cartItems" :key="item.id">{{ item.name }}</li>
    </ul>
  </div>
</template>

<script>
import { ref, watchEffect } from 'vue'; // Import ref and watchEffect
import { useStore } from '@/store/composition';
import { useAuthStore } from '@/store/auth'; // Import the auth store module

export default {
  setup() {
    const store = useStore();
    const authStore = useAuthStore(); // Use the auth store module
    const bagItems = store.bagItems;

    let cartItems = [];

    // Use watchEffect to react to changes in auth state
    watchEffect(() => {
      if (authStore.isAuthenticated) {
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
    };
  },
};
</script>
