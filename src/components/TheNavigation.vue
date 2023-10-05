<template>
  <div class="the-navigation">
    <div class="nav-container">
      <div class="link-container left">
        <div class="link-wrapper">
          <router-link to="/shop">Shop</router-link>
        </div>
        <div class="link-wrapper">
          <a @click="showSearchBar">Search</a>
        </div>
      </div>
      <div class="link-container center">
        <div class="link-wrapper">
          <router-link class="home-logo" to="/"> HOME </router-link>
        </div>
      </div>
      <div class="link-container right">
        <div class="link-wrapper">
          <!-- Apply PopoverHoverLink to the "Profile" link -->
          <div class="popover-hover-wrapper" v-if="authStore.isAuthenticated">
            <PopoverHoverLink>
              <router-link :to="'/profile'">Profile</router-link>
              <!-- Popover content slot -->
              <template #popover-content>
                <div class="popover-list">
                  <router-link :to="'/history'"
                    >Purchase History{{ '\n' }}</router-link
                  >
                  <router-link :to="'/email'"
                    >Email Preference{{ '\n' }}</router-link
                  >
                  <a @click="logout">Logout</a>
                </div>
              </template>
            </PopoverHoverLink>
          </div>
          <div class="login-wrapper" v-if="!authStore.isAuthenticated">
            <router-link to="/login"> Login </router-link>
          </div>
        </div>
        <div class="link-wrapper">
          <div class="link-wrapper">
            <router-link :to="'/wishlist'">
              {{ 'Wishlist' }}
            </router-link>
          </div>
        </div>
        <div class="link-wrapper">
          <div class="link-wrapper">
            <router-link :to="'/cart'">
              {{ 'Cart' }}
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
***REMOVED*** ref } from 'vue';
***REMOVED*** useRouter } from 'vue-router';
***REMOVED*** useAuthStore } from '@/store/auth'; // Import the auth store module
import SearchBar from '@/components/widgets/SearchBar/SearchBar.vue';
import PopoverHoverLink from '@/components/widgets/Popover/ProfilePopover.vue'; // Import the PopoverHoverLink component

export default {
  components: {
    SearchBar,
    PopoverHoverLink, // Register the PopoverHoverLink component
  },
  setup() {
    // router
    const router = useRouter();
    const authStore = useAuthStore();

    // SearchBar Modal
    const modalActive = ref(false);

    const toggleModal = () => {
      modalActive.value = !modalActive.value;
    ***REMOVED***

    const logout = () => {
      authStore.signOut();
      router.push('/');
    ***REMOVED***

    return {
      router,
      authStore,
      modalActive,
      toggleModal,
      logout,
    ***REMOVED***
  },
***REMOVED***
</script>

<style lang="scss" scoped>
.nav-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 90px;
  padding: 0 30px;

  position: fixed;
  top: 0;
  left: 0;
  right: 0;

  background-color: #2c3e50;
  color: white;

  .link-container {
    width: 30%;
    display: flex;
    flex-direction: row;

    &.left {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;

      .link-wrapper {
        margin-right: 20px;
      }
    }

    &.center {
      display: flex;
      flex-direction: row;
      justify-content: center;
    }

    &.right {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;

      .link-wrapper {
        margin-left: 20px;
      }
    }

    .link-wrapper {
      .home-logo {
        font-size: 40px;
      }
    }
  }

  .popover-list {
    color: black;
    width: 130px;
    text-align: center;
  }
}
</style>
