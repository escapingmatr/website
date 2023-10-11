<template>
  <div>
    <h2>Wishlist Items</h2>
    <ul>
      <li v-for="item in wishlistItems" :key="item.id">{{ item.name }}</li>
    </ul>
  </div>
</template>

<script>
import { useStore } from '@/store/composition';

export default {
  setup() {
    const store = useStore();
    const wishlistItems = store.wishlistItems;

    return {
      wishlistItems,
    };
  },
};
</script>
