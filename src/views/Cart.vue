<template>
  <div>
    <h2>Shopping Bag</h2>
    <div class="shopping-bag">
      <div class="bag-items">
        <div
          class="bag-item"
          v-for="bagItem in bagItems"
          :key="bagItem.item.id"
        >
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
            <div class="remove-from-bag" @click="removeFromBag(bagItem)">
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
  </div>
</template>

<script>
import { ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
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
    const router = useRouter();

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
      router.push('/checkout');
    };

    const removeFromBag = (bagItem) => {
      // Remove the item from the local state
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
      removeFromBag,
      proceedToCheckout,
    };
  },
};
</script>

<style lang="scss" scoped>
.shopping-bag {
  display: flex;
  justify-content: center;
  .bag-items {
    display: flex;
    flex-direction: column;
    width: 70%;
    .bag-item {
      margin: 4px;
      border: 1px solid #ccc;
      display: flex;
      height: 30vh;
      padding: 8px;
      .bag-item-details {
        display: flex;
        width: calc(100% - 66px);
        .bag-item-photo {
          img {
            height: 100%;
            width: auto;
          }
        }
        .bag-item-info {
          padding: 0 8px;
          display: flex;
          flex-direction: column;
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
        }
      }
      .actions {
        .remove-from-bag {
          cursor: pointer;
          &:hover {
            color: red;
          }
        }
        justify-content: center;
        align-items: center;
      }
    }
  }
  .checkout-section {
    width: 30vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 16px;
    .user-account {
      margin-bottom: 16px;
    }
  }
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
