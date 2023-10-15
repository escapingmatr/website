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
        <p class="price">${{ product.price }}</p>
      </div>
      <size-dropdown
        :id="productSizeSelectId"
        :label="label"
        :units="product.units"
        :selectedUnit="selectedUnit"
        :defaultOption="defaultOption"
        @update:selectedUnit="selectedUnit = $event"
      />
      <div class="actions">
        <button class="add-to-bag" @click="addToBag(product, selectedUnit)">
          Add to Bag
        </button>
        <button
          class="add-to-wishlist"
          @click="addToWishlist(product, selectedUnit)"
        >
          Add to Wishlist
        </button>
      </div>
      <p>{{ product.description }}</p>
      <p>Materials: {{ product.materials[0] }}</p>
      <p>Care Instructions: {{ product.materials[1] }}</p>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, watchEffect } from 'vue';
import PhotoCarousel from '@/components/widgets/PhotoCarousel/PhotoCarousel.vue';
import SizeDropdown from '@/components/widgets/Dropdown/SizeDropdown.vue';
import { useStore } from '@/store/composition';
import { useDBStore } from '@/store/database';

export default {
  name: 'product-page',
  data() {
    return {
      post: null,
      error: null,
      productSizeSelectId: 'size-select',
      label: '',
      defaultOption: 'SELECT A SIZE',
    };
  },
  props: {
    productsku: String,
  },
  components: {
    PhotoCarousel,
    SizeDropdown,
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

    // Define the label ref to hold the selected size
    const label = ref('Size:');

    // Method to update the label with the selected size
    const updateLabel = () => {
      if (selectedUnit.value !== null) {
        const selectedSizeUnitPair = product.value.units[selectedUnit.value];
        const selectedSize = selectedSizeUnitPair
          ? Object.keys(selectedSizeUnitPair)[0]
          : '';
        label.value = `Size: ${selectedSize}`;
      } else {
        label.value = 'Size:';
      }
    };

    // wishlist & shopping cart implementation
    const store = useStore();

    // Access the bagItems and wishlistItems
    const bagItems = computed(() => store.bagItems);
    const wishlistItems = computed(() => store.wishlistItems);

    // Modify the bagItems and wishlistItems using actions
    const addToBag = (item, size) => {
      store.addToBag(item, size);
    };

    const addToWishlist = (item, size) => {
      store.addToWishlist(item, size);
    };

    // Return data and methods
    return {
      product,
      selectedUnit,
      updateLabel,
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
