<template>
    <div class="website-wrapper">
        <TheNavigation />
        <router-view></router-view>
    </div>
</template>
  
<script>
  import TheNavigation from '@/components/TheNavigation.vue';
  export default {
    components: { TheNavigation },
  ***REMOVED***
</script>
  
<style lang="scss" scoped>
.website-wrapper {
    width: 100vw;
    margin: 0 0;
    padding: 0 0;
}
</style>