<template>
  <div class="photo-carousel">
    <button @click="prevPhoto">&lt;</button>
    <!--photos should be saved under /public/images-->
    <img :src="`/images/${currentPhoto}`" alt="Carousel Photo" />
    <button @click="nextPhoto">&gt;</button>
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
    };
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
};
</script>

<style>
/* Add your styles here */
.photo-carousel {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}
</style>
