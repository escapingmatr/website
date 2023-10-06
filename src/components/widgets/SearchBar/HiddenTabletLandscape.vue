<template>
  <div
    class="tablet-landscape-search"
    v-if="isTabletLandscape && isSearchVisible"
  >
    <!-- Your search box content goes here -->
    <SearchBar />
  </div>
</template>

<script>
***REMOVED*** ref, onMounted, onBeforeUnmount } from 'vue';
***REMOVED*** useAuthStore } from '@/store/auth'; // Import your auth store module
import SearchBar from '@/components/widgets/SearchBar/SearchBar.vue'; // Import your SearchBar component

export default {
  components: {
    SearchBar,
  },
  setup() {
    const authStore = useAuthStore();

    const isTabletLandscape = ref(false);
    const isSearchVisible = ref(false);

    const checkTabletLandscape = () => {
      isTabletLandscape.value =
        window.innerWidth >= 1024 && window.innerWidth <= 1279;
    ***REMOVED***

    onMounted(() => {
      checkTabletLandscape();
      window.addEventListener('resize', checkTabletLandscape);
    });

    onBeforeUnmount(() => {
      window.removeEventListener('resize', checkTabletLandscape);
    });

    return {
      isTabletLandscape,
      isSearchVisible,
    ***REMOVED***
  },
***REMOVED***
</script>

<style scoped>
/* Add your CSS styles for the tablet landscape search box here */
.tablet-landscape-search {
  position: absolute;
  /* top: 0;
  right: 0; */
  /* left: 0; */
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 101; /* Ensure it appears above other content */
}
</style>
