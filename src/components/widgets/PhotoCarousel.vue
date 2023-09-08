<template>
  <div class="photo-carousel">
    <div class="carousel-inner">
      <button class="carousel-control left" @click="prevPhoto">&lt;</button>
      <div class="carousel-item">
        <!--photos should be saved under /public/images-->
        <img
          class="photo"
          :src="`/images/${currentPhoto}`"
          alt="Carousel Photo"
        />
      </div>
      <button class="carousel-control right" @click="nextPhoto">&gt;</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    photos: Array, // Array of photo URLs
  },
  data() {
    return {
      currentIndex: 0,
    ***REMOVED***
  },
  computed: {
    currentPhoto() {
      return this.photos[this.currentIndex];
    },
  },
  methods: {
    prevPhoto() {
      this.currentIndex =
        (this.currentIndex - 1 + this.photos.length) % this.photos.length;
    },
    nextPhoto() {
      this.currentIndex = (this.currentIndex + 1) % this.photos.length;
    },
  },
***REMOVED***
</script>

<style lang="scss" scoped>
/* Add your styles here */
.photo-carousel {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60vw;
  margin: 0 auto;
}
.carousel-inner {
  position: relative;
}
.photo {
  /* adjusted to fit */
  height: 80vh;
  width: auto;
}
.carousel-control {
  position: absolute;
  display: inline-block;
  height: 50px;
  width: 30px;
  top: calc(50% - 40px);
  background-color: rgba(0, 0, 0, 0.3); /* Add a background color */
  cursor: pointer; /* Add a pointer cursor for better UX */
  border: none; /* Remove the border */
  outline: none; /* Remove the outline */
  transition: background-color 0.3s;
  &:hover {
    background-color: rgba(0, 0, 0, 0.7); /* Change color on hover */
  }
  &.left {
    left: 0;
  }
  &.right {
    right: 0;
  }
}
</style>
