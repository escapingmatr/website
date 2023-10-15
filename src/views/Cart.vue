<template>
  <div>
    <h2>Shopping Bag</h2>
    <div class="bag-items">
      <div class="bag-item" v-for="bagItem in bagItems" :key="bagItem.item.id">
        <div class="bag-item-details">
          <div class="bag-item-photo">
            <img
              :src="`/images/${bagItem.item.sku}/${bagItem.item.photos[2]}`"
              :alt="bagItem.item.name"
            />
          </div>
          <div class="bag-item-info">
            <p class="bag-item-name">{{ bagItem.item.name }}</p>
            <size-dropdown
              :id="'size-select-' + bagItem.timestamp"
              :label="label"
              :units="bagItem.item.units"
              :selectedUnit="bagItem.size"
              :defaultOption="defaultOption"
              @update:selectedUnit="selectedUnit = $event"
            />
            <p class="bag-item-price">$ {{ bagItem.item.price }}</p>
          </div>
        </div>
        <div class="actions">
          <div class="remove-from-wishlist" @click="removeFrombag(bagItem)">
            REMOVE
          </div>
        </div>
      </div>
    </div>
    <div class="checkout-section">
      <div class="user-account">
        <div v-if="authStore.isAuthenticated">
          Logged in as {{ authStore.user.displayName }}
        </div>
        <div v-else>Not logged in</div>
      </div>
      <button @click="proceedToCheckout">Proceed to Checkout</button>
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

    let bagItems = ref([]);

    watchEffect(() => {
      if (authStore.initialized && authStore.isAuthenticated) {
        bagItems.value = bagItems.value; // Update the value
      } else {
        const localBagItems = localStorage.getItem('bagItems');
        bagItems.value = localBagItems ? JSON.parse(localBagItems) : [];
      }
    });

    const proceedToCheckout = () => {
      // Add your logic to handle proceeding to checkout
      // You can navigate to the checkout page or perform other actions.
    };

    const removeFrombag = (bagItem) => {
      // Immediately remove the item from the local state
      const index = bagItems.value.findIndex(
        (item) => item.timestamp === bagItem.timestamp
      );
      if (index !== -1) {
        bagItems.value.splice(index, 1);
      }
      // update database
      store.removeFromBag(bagItem);
    };

    return {
      authStore,
      bagItems,
      removeFrombag,
      proceedToCheckout,
    };
  },
};
</script>

<style lang="scss" scoped>
.bag-items {
  display: flex;
  flex-wrap: wrap;
}

.bag-item {
  flex: 0 0 calc(50% - 16px); /* Two items per row with some spacing */
  margin: 8px;
  border: 1px solid #ccc;
  display: flex;
  padding: 8px;
  .actions {
    cursor: pointer;
    justify-content: center;
    align-items: center;
  }
}

.bag-item-details {
  display: flex;
  width: 100%;
}

.bag-item-photo {
  flex: 1;
}

.bag-item-photo img {
  max-width: 100%;
  height: auto;
}

.bag-item-info {
  flex: 2;
  padding: 0 16px;
  display: flex;
  flex-direction: column;
}

.bag-item-name {
  font-size: 1.2rem;
  font-weight: 500;
  margin: 0;
}

.bag-item-price {
  font-size: 1rem;
  margin-top: 8px;
  color: #007bff;
}

.checkout-section {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-top: 16px;
}

.user-account {
  margin-bottom: 16px;
}

button {
  padding: 12px 24px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #0056b3;
}
</style>
