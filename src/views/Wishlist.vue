<template>
  <div class="wishlist">
    <div class="page-title">
      <h1>Wishlist</h1>
    </div>
    <div class="wishlists">
      <div
        class="wishItem"
        v-for="wishItem in sortedWishItems"
        :key="wishItem.id"
      >
        <router-link :to="'/shop/' + wishItem.item.sku">
          <div class="wishItem-photo">
            <img
              :src="`/images/${wishItem.item.sku}/${wishItem.item.photos[2]}`"
              :alt="wishItem.item.name"
            />
          </div>
          <div class="text-info">
            <div class="wishItem-name">{{ wishItem.item.name }}</div>
            <div class="wishItem-price">$ {{ wishItem.item.price }}</div>
          </div>
        </router-link>
        <size-dropdown
          :id="'size-select-' + wishItem.timestamp"
          :label="label"
          :units="wishItem.item.units"
          :selectedUnit="wishItem.size"
          :defaultOption="defaultOption"
          @update:selectedUnit="selectedUnit = $event"
        />
        <div class="actions">
          <div class="move-to-bag" @click="moveToBag(wishItem, selectedUnit)">
            ADD TO BAG
          </div>
          <div
            class="remove-from-wishlist"
            @click="removeFromWishlist(wishItem)"
          >
            REMOVE
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watchEffect } from 'vue';
import { useStore } from '@/store/composition';
import { useAuthStore } from '@/store/auth';
import SizeDropdown from '@/components/widgets/Dropdown/SizeDropdown.vue';

export default {
  data() {
    return {
      wishSizeSelectId: 'size-select',
      label: '',
      defaultOption: 'SELECT A SIZE',
      product: {}, // Initialize product as an empty object
    };
  },
  components: {
    SizeDropdown,
  },
  setup() {
    const store = useStore();
    const authStore = useAuthStore();
    let wishItems = ref([]);

    // Create a watchEffect to automatically update sortedWishItems when wishItems change
    watchEffect(() => {
      if (authStore.isAuthenticated) {
        wishItems.value = store.wishlistItems;
      } else {
        const localWishlistItems = localStorage.getItem('wishlistItems');
        wishItems.value = localWishlistItems
          ? JSON.parse(localWishlistItems)
          : [];
      }
    });

    const sortedWishItems = ref([]);

    // Create a watchEffect to sort and reverse wishItems when they change
    watchEffect(() => {
      sortedWishItems.value = wishItems.value
        .slice() // Create a shallow copy to avoid mutating the original array
        .sort((a, b) => a.timestamp - b.timestamp)
        .reverse();
    });

    const getDisplayedSize = (wishItem) => {
      return wishItem.item.units[wishItem.size];
    };

    const selectedUnit = ref(null);

    watchEffect(() => {
      // Check if there are wishItems available
      if (wishItems.value.length > 0) {
        // Use the size of the first wishItem as the initial selectedUnit
        selectedUnit.value = wishItems.value[0].size;
      } else {
        // If no wishItems, set selectedUnit to null or a default value
        selectedUnit.value = null; // You can set a default size here if needed
      }
    });

    const moveToBag = (wishItem, size) => {
      if (!!selectedUnit) {
        store.addToBag(wishItem.item, size);
      } else {
        store.addToBag(wishItem.item, wishItem.size);
      }
      removeFromWishlist(wishItem);
    };

    const removeFromWishlist = async (wishItem) => {
      // Remove the item from the local state
      const index = wishItems.value.findIndex(
        (item) => item.timestamp === wishItem.timestamp
      );
      if (index !== -1) {
        wishItems.value.splice(index, 1);
      }

      // Update the database
      store.removeFromWishlist(wishItem);
    };

    return {
      sortedWishItems,
      selectedUnit,
      getDisplayedSize,
      moveToBag,
      removeFromWishlist,
    };
  },
};
</script>

<style lang="scss" scoped>
.wishlist {
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
  .actions {
    cursor: pointer;
    justify-content: center;
    align-items: center;
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
