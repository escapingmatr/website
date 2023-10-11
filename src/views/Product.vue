<template>
  <div class="product">
    <div class="product-carousel">
      <!-- Carousel and navigation buttons here -->
      <photo-carousel :photos="product.photos" :productSku="product.sku" />
    </div>
    <div class="text-info">
      <div class="product-name">
        <h1>{{ product.name }}</h1>
      </div>
      <div class="price-box">
        <p class="price">Price: ${{ product.price }}</p>
      </div>
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
      <div class="actions">
        <button class="add-to-bag" @click="addToBag(product)">
          Add to Bag
        </button>
        <button class="add-to-wishlist" @click="addToWishlist(product)">
          Add to Wishlist
        </button>
      </div>
      <p>{{ product.description }}</p>
      <p>Materials: {{ product.materials }}</p>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'; // Import the computed function
import sourceData from '@/data.json';
import PhotoCarousel from '@/components/widgets/PhotoCarousel/PhotoCarousel.vue';
import { useStore } from '@/store/composition';

export default {
  name: 'product',
  props: {
    productsku: String,
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
      // Access the products array from sourceData
      const products = sourceData.products;

      // Find the product with the matching sku
      return products.find((product) => product.sku === this.productsku);
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

<style lang="scss" scoped>
.product {
  display: flex;
  padding: 20px;
}

.product-carousel {
  /* Your carousel styles */
  width: 80%;
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
