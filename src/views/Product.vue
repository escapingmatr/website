<template>
  <div class="product-page">
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
          v-for="(unitSize, unitIndex) in sortedSizes"
          :key="unitSize"
          class="unit-button"
          :class="{ active: selectedUnit === unitIndex }"
          @click="selectUnit(unitIndex)"
        >
          {{ unitSize[0] }}
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

    // Create refs for product data
    const product = ref({
      photos: [],
      name: '',
      price: 0,
      units: {},
      description: '',
      materials: '',
      sku: '',
    });
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

    // Add a ref for the currently selected unit
    const selectedUnit = ref(null);

    // Method to select a unit
    const selectUnit = (unitSize) => {
      selectedUnit.value = unitSize;
    };

    // Define a custom order for non-numeric sizes
    const nonNumericSizeOrder = ['S', 'M', 'L', 'XL'];

    // Create a computed property to sort the sizes
    const sortedSizes = computed(() => {
      const sizes = product.value.units; // Assuming product.units is a map

      // Check if sizes are numeric (pants sizes) or non-numeric (e.g., S, M, L, XL)
      const numericSizes = Object.entries(sizes)
        .filter(([size]) => !isNaN(size))
        .sort((a, b) => parseFloat(a[0]) - parseFloat(b[0])); // Sort numeric sizes

      const nonNumericSizes = Object.entries(sizes)
        .filter(([size]) => isNaN(size))
        .sort(
          (a, b) =>
            nonNumericSizeOrder.indexOf(a[0]) -
            nonNumericSizeOrder.indexOf(b[0])
        ); // Sort non-numeric sizes based on the custom order

      // Combine the sorted sizes and convert them back to a map
      const sortedMap = new Map([...numericSizes, ...nonNumericSizes]);

      console.log(sortedMap);

      return sortedMap;
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
      selectedUnit,
      selectUnit,
      sortedSizes,
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
  width: 28px;
  height: 26px;
  text-align: center;
  justify-content: center;
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

.unit-button:hover,
.add-to-bag:hover,
.add-to-wishlist:hover {
  background-color: #ccc; /* Change to your desired hover color */
}
</style>
