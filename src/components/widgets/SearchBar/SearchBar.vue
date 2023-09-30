<template>
  <div>
    <teleport to="body">
      <div class="modal" v-if="isOpenProp">
        <div class="searchbar">
          <p>searchbar</p>
          <button @click="closeSearchBar">close</button>
        </div>
      </div>
    </teleport>
  </div>
</template>

<script setup>
***REMOVED*** defineProps } from 'vue';

// Declare the prop 'isOpen'
const { isOpen } = defineProps(['isOpen']);

// Method to close the search bar
const closeSearchBar = () => {
  isOpen.value = false;
***REMOVED***
</script>

<style lang="scss" scoped>
.modal {
  position: absolute; /* Fix the position value */
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.1);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .searchbar {
    background-color: #fff;
    padding: 50px;
    border-radius: 10px;
  }
}
</style>
