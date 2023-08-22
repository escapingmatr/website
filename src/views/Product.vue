<template>
  <div class="product">
    <div class="product-carousel">
      <!-- Carousel and navigation buttons here -->
      <photo-carousel :photos="product.photos" />
    </div>
    <div class="product-details">
      <h1>{{ product.name }}</h1>
      <p class="price">Price: ${{ product.price }}</p>
      <div class="unit-buttons">
        <button
          v-for="(unitValue, unitSize) in product.units[0]"
          :key="unitSize"
          class="unit-button"
          :class="{ active: selectedUnit === unitSize }"
          @click="selectUnit(unitSize)"
        >
          {{ unitSize }}
        </button>
      </div>
      <p>{{ product.description }}</p>
      <p>Materials: {{ product.materials }}</p>
      <div class="actions">
        <button class="add-to-bag" @click="addToBag(product)">
          Add to Bag
        </button>
        <button class="add-to-wishlist" @click="addToWishlist(product)">
          Add to Wishlist
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'; // Import the computed function
import sourceData from '@/data.json';
import PhotoCarousel from '@/components/widgets/PhotoCarousel.vue';
import { useStore } from '@/store/composition';

export default {
  name: 'product',
  props: {
    stocksku: String,
  },
  components: {
    PhotoCarousel,
  },
  data() {
    return {
      selectedUnit: null,
    };
  },
  computed: {
    product() {
      // Access the stocks array from sourceData
      const stocks = sourceData.stocks;

      // Find the product with the matching sku
      return stocks.find((stock) => stock.sku === this.stocksku);
    },
  },
  methods: {
    selectUnit(unitSize) {
      this.selectedUnit = unitSize;
    },
  },
  setup() {
    const store = useStore();

    // Access the bagItems and wishlistItems
    const bagItems = computed(() => store.bagItems);
    const wishlistItems = computed(() => store.wishlistItems);

    // Modify the bagItems and wishlistItems using actions
    const addToBag = (item) => {
      store.addToBag(item);
    };

    const addToWishlist = (item) => {
      store.addToWishlist(item);
    };

    // Return data and methods
    return {
      bagItems,
      wishlistItems,
      addToBag,
      addToWishlist,
    };
  },
};
</script>

<style scoped>
.product {
  display: flex;
  padding: 20px;
}

.product-carousel {
  /* Your carousel styles */
}

/* Other existing styles */

.unit-buttons {
  margin-bottom: 10px;
}

.unit-button {
  margin-right: 10px;
  padding: 5px 10px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
}

.unit-button.active {
  background-color: #ccc; /* Change to your desired active color */
}

.actions {
  margin-top: 20px;
}

.add-to-bag,
.add-to-wishlist {
  padding: 10px 20px;
  background-color: transparent;
  border: 1px solid #ccc;
  cursor: pointer;
  margin-right: 10px;
  transition: background-color 0.3s;
}

.add-to-bag:hover,
.add-to-wishlist:hover {
  background-color: #ccc; /* Change to your desired hover color */
}
</style>
