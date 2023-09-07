<template>
  <div class="photo-carousel">
    <div class="carousel-inner">
      <button class="carousel-control left" @click="prevPhoto">&lt;</button>
      <!--photos should be saved under /public/images-->
      <img
        class="photo"
        :src="`/images/${currentPhoto}`"
        alt="Carousel Photo"
      />
      <button class="carousel-control left" @click="nextPhoto">&gt;</button>
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
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 0 auto;
}
.carousel-inner {
  position: relative;
}
.photo {
  /* adjust the size of the photo */
  width: 50%;
  height: auto;
}
.button {
  position: absolute;
  display: inline-block;
  top: 0;
}
</style>
