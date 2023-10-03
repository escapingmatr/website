<template>
  <div
    class="hoverable-dropdown"
    @mouseenter="showDropdown = true"
    @mouseleave="showDropdown = false"
  >
    <div class="dropdown-toggle">Hover me</div>
    <div v-if="showDropdown" class="dropdown-content">
      <!-- Dropdown content goes here -->
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showDropdown: false,
    ***REMOVED***
  },
***REMOVED***
</script>

<style scoped>
/* Add your CSS styles for the dropdown here */
.hoverable-dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-toggle {
  cursor: pointer;
}

.dropdown-content {
  position: absolute;
  top: 100%;
  left: 0;
  display: none;
  /* Add other styles as needed */
}

.hoverable-dropdown:hover .dropdown-content {
  display: block;
}
</style>
