<template>
  <div class="shop">
    <div class="page-title">
      <h1>Shop</h1>
    </div>
    <div class="stocks">
      <div class="stock" v-for="stock in stocks" :key="stock.sku">
        <router-link :to="'/shop/' + stock.sku">
          <div class="stock-photo">
            <img :src="`/images/${stock.photos[2]}`" :alt="stock.name" />
          </div>
          <div class="stock-name">
            <h5>{{ stock.name }}</h5>
          </div>
          <div class="stock-price">
            <h4>${{ stock.price }}</h4>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import sourceData from '@/data.json';
export default {
  data() {
    return {
      stocks: sourceData.stocks,
    ***REMOVED***
  },
***REMOVED***
</script>

<style lang="scss" scoped>
.shop {
  /* Add any other styling for the shop page */
}

.stocks {
  display: flex;
  flex-wrap: wrap; /* Allow stocks to wrap to the next line */
  gap: 0.5%; /* Adjust the gap as needed between stocks */
  padding-left: 0.5%;
  padding-right: 0.5%;
}

.stock {
  flex: 0 0 calc(24.62554%); /* Four items per row with a gap between */
  box-sizing: border-box; /* Include padding and border in the width calculation */
}

/* Add any other styling for the individual stocks */
.stock-name {
  /* Style for stock name */
}

.stock-photo {
  /* Style for stock photo */
  text-align: center; /* Center the image horizontally */
}

img {
  max-width: 100%; /* Ensure images don't exceed their container width */
}
</style>
