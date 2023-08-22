<template>
  <div class="shop">
    <h1>Shop</h1>
    <div class="stocks">
      <div v-for="stock in stocks" :key="stock.sku">
        <router-link :to="'/shop/' + stock.sku">
          <h2>{{ stock.name }}</h2>
          <img :src="`/images/${stock.photos[2]}`" :alt="stock.name" />
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
