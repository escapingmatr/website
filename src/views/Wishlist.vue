<template>
  <div>
    <h2>Wishlist Items</h2>
    <ul>
      <li v-for="item in wishItems" :key="item.id">{{ item.name }}</li>
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
    const wishlistItems = store.wishlistItems;

    let wishItems = [];

    // Use watchEffect to react to changes in auth state
    watchEffect(() => {
      if (authStore.isAuthenticated) {
        // User is logged in, use bag items from Firebase
        wishItems = wishlistItems;
      } else {
        // User is not logged in, use bag items from local storage
        const localWishlistItems = localStorage.getItem('wishlistItems');
        wishItems = localWishlistItems ? JSON.parse(localWishlistItems) : [];
      }
    });

    return {
      wishItems,
    };
  },
};
</script>
