<template>
  <div>
    <div class="modal">
      <div class="searchbar-container">
        <div class="searchbar">
          <p>searchbar</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.modal {
  display: flex;
  background-color: white;
  // width: auto;
  // height: 100%;
  display: flex;
  justify-content: left;
  align-items: center;
  padding-left: 18px;
  z-index: 102;
}

.searchbar-container {
  // padding: 20px; /* Add your desired padding here */
}

.searchbar {
  background-color: #fff;
  color: black;
  // padding: 50px;
  border-radius: 10px;
}
</style>
