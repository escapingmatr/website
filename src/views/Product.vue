<template>
  <div class="product-page">
    <!-- Display a loading state while product data is being fetched -->
    <!-- <div v-if="isLoading" class="loading">Loading product...</div> -->

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
          v-for="(unitValue, unitSize) in product.units"
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
      <p>Materials: {{ product.materials[0] }}</p>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, watchEffect } from 'vue';
import PhotoCarousel from '@/components/widgets/PhotoCarousel/PhotoCarousel.vue';
import { useStore } from '@/store/composition';
import { useDBStore } from '@/store/database';

export default {
  name: 'product-page',
  data() {
    return {
      loading: false,
      post: null,
      error: null,
    };
  },
  props: {
    productsku: String,
  },
  components: {
    PhotoCarousel,
  },
  setup(props) {
    const dbStore = useDBStore();

    // Create refs for product data and loading state
    const product = ref({
      photos: [],
      name: '',
      price: 0,
      units: {},
      description: '',
      materials: '',
      sku: '',
    });
    const isLoading = ref(true);
    const collectionName = 'products';
    const documentId = props.productsku;

    watchEffect(() => {
      product.value = dbStore.getDocumentData; // this works
    });

    // Call the fetchProductData function when the component is mounted
    onMounted(() => {
      dbStore
        .fetchDocumentFromFirestore(collectionName, documentId)
        .then(() => {
          product.value = dbStore.getDocumentData;
        });
    });

    // wishlist & shopping cart implementation
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
      product,
      isLoading,
      bagItems,
      wishlistItems,
      addToBag,
      addToWishlist,
    };
  },
};
</script>

<style lang="scss" scoped>
.product-page {
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

.unit-button:active {
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

.unit-button:hover,
.add-to-bag:hover,
.add-to-wishlist:hover {
  background-color: #ccc; /* Change to your desired hover color */
}
</style>
