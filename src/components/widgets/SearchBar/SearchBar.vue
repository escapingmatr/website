<template>
  <div>
    <teleport to="header">
      <div class="modal" v-if="isOpen">
        <div class="searchbar">
          <p>searchbar</p>
          <button @click="isOpen = false">close</button>
        </div>
      </div>
    </teleport>
  </div>
</template>

<script>
***REMOVED*** ref } from 'vue';

export default {
  props: {
    isOpen: Boolean,
  },
***REMOVED***
</script>

<style lang="scss" scoped>
.modal {
  position: isAbsolute;
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
