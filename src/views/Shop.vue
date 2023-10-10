<template>
  <div class="shop">
    <div class="page-title">
      <h1>Shop</h1>
    </div>
    <div class="products">
      <div class="product" v-for="product in products" :key="product.sku">
        <router-link :to="'/shop/' + product.sku">
          <div class="product-photo">
            <img :src="`/images/${product.photos[2]}`" :alt="product.name" />
          </div>
          <div class="text-info">
            <div class="product-name">
              {{ product.name }}
            </div>
            <div class="product-price">${{ product.price }}</div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
***REMOVED*** useDBStore } from '@/store/database';
***REMOVED*** ref, watchEffect, onMounted } from 'vue';

export default {
  setup() {
    const dbStore = useDBStore();

    // Use refs to create reactive variables
    const products = ref([]);

    // Watch for changes in collectionProducts and update the products ref
    watchEffect(() => {
      products.value = dbStore.collectionProducts;
    });

    // Fetch data on component initialization
    onMounted(() => {
      dbStore.fetchCollectionProducts();
    });

    return { products ***REMOVED***
  },
***REMOVED***
</script>

<style lang="scss" scoped>
.shop {
  /* Add any other styling for the shop page */
  .page-title {
    text-align: center;
  }
}

.products {
  display: flex;
  flex-wrap: wrap; /* Allow products to wrap to the next line */
  .product {
    flex: 0 0 calc(25%); /* Four items per row with a gap between */
    box-sizing: border-box; /* Include padding and border in the width calculation */
    padding: 0%;
    margin-bottom: 1.5%;
  }
  .text-info {
    position: relative;
    padding: 5px 2.4px 2.8px;
    .product-name {
      /* Style for product name */
      font-size: 13.5px;
      font-weight: 550;
    }
    .product-price {
      font-size: 13.5px;
      font-weight: 550;
    }
  }
}

.product-photo {
  /* Style for product photo */
  text-align: center; /* Center the image horizontally */
}

img {
  max-width: 100%; /* Ensure images don't exceed their container width */
}
</style>
