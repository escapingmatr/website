<template>
  <div class="shop">
    <div class="page-title">
      <h1>Wishlist</h1>
    </div>
    <div class="wishlists">
      <div class="wishItem" v-for="wishItem in wishItems" :key="wishItem.sku">
        <router-link :to="'/shop/' + wishItem.sku">
          <div class="wishItem-photo">
            <img
              :src="`/images/${wishItem.sku}/${wishItem.photos[2]}`"
              :alt="wishItem.name"
            />
          </div>
          <div class="text-info">
            <div class="wishItem-name">
              {{ wishItem.name }}
            </div>
            <div class="wishItem-price">${{ wishItem.price }}</div>
          </div>
        </router-link>
      </div>
    </div>
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
<style lang="scss" scoped>
.shop {
  /* Add any other styling for the shop page */
  .page-title {
    text-align: center;
  }
}

.wishlists {
  display: flex;
  flex-wrap: wrap; /* Allow wishItems to wrap to the next line */
  .wishItem {
    flex: 0 0 calc(25%); /* Four items per row with a gap between */
    box-sizing: border-box; /* Include padding and border in the width calculation */
    padding: 0%;
    padding: 1.5%;
    border: 1px solid white;
  }
  .text-info {
    position: relative;
    padding: 5px 2.4px 2.8px;
    .wishItem-name {
      /* Style for wishItem name */
      font-size: 13.5px;
      font-weight: 550;
    }
    .wishItem-price {
      font-size: 13.5px;
      font-weight: 550;
    }
  }
}

.wishItem-photo {
  /* Style for wishItem photo */
  text-align: center; /* Center the image horizontally */
}

img {
  max-width: 100%; /* Ensure images don't exceed their container width */
}
</style>
