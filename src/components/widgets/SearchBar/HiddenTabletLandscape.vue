<template>
  <div class="tablet-landscape-search" v-if="isSearchVisible">
    <!-- Your search box content goes here -->
    <div class="searchbar-content">
      <SearchBar />
    </div>
    <div class="close" @click="isSearchVisible = false">close</div>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useAuthStore } from '@/store/auth'; // Import your auth store module
import SearchBar from '@/components/widgets/SearchBar/SearchBar.vue'; // Import your SearchBar component

export default {
  components: {
    SearchBar,
  },
  setup() {
    const authStore = useAuthStore();

    const isSearchVisible = ref(false);

    return {
      isSearchVisible,
    };
  },
};
</script>

<style scoped lang="scss">
/* Add your CSS styles for the tablet landscape search box here */
.tablet-landscape-search {
  position: absolute;
  left: 30px; /* same as the left indent on the navbar */
  width: 450px;
  height: 90px;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 101; /* Ensure it appears above other content */
  display: flex;
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */
  padding: 18px;
  .close {
    margin-left: 18px;
    cursor: pointer;
  }
}

.searchbar-content {
  /* Add any additional styling for the search bar content */
  width: 100%;
}
</style>
