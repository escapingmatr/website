<template>
  <div
    class="popover-hover-link"
    @mouseover="showPopover = true"
    @mouseenter="clearHidePopoverTimeout"
    @mouseleave="hidePopoverWithDelay"
  >
    <a>
      <slot></slot>
    </a>

    <div
      v-show="showPopover"
      class="popover"
      @mouseover="showPopover = true"
      @mouseleave="hidePopover"
    >
      <slot name="popover-content"></slot>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showPopover: false,
      hidePopoverTimeout: null,
    ***REMOVED***
  },
  methods: {
    hidePopoverWithDelay() {
      // Delay hiding the popover by 1000ms (1 second)
      this.hidePopoverTimeout = setTimeout(() => {
        this.hidePopover();
      }, 1000);
    },
    clearHidePopoverTimeout() {
      // Clear the hidePopoverTimeout when the mouse reenters the popover
      clearTimeout(this.hidePopoverTimeout);
    },
    hidePopover() {
      this.showPopover = false;
    },
  },
***REMOVED***
</script>

<style scoped>
.popover-hover-link {
  display: inline-block;
  position: relative;
}

.popover-hover-link a {
  text-decoration: none;
}

.popover {
  position: absolute;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 100;
}
</style>
