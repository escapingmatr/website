***REMOVED*** createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from '@/router';
***REMOVED*** createPinia } from 'pinia';
// ***REMOVED*** getAuth, onAuthStateChanged ***REMOVED***
// ***REMOVED*** useAuthStore } from './store/auth'; // Import the auth store module

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);

// ***REMOVED***
// ***REMOVED***

// ***REMOVED***
// ***REMOVED***

// ***REMOVED***
// ***REMOVED***
// ***REMOVED***
// ***REMOVED***
// ***REMOVED***
// ***REMOVED***
// ***REMOVED***
// ***REMOVED***
// ***REMOVED***
// ***REMOVED***
// ***REMOVED***

// ***REMOVED***
// initializeApp(firebaseConfig);

// const auth = getAuth();
// const authStore = useAuthStore();

// onAuthStateChanged(auth, (user) => {
//   if (user) {
//     authStore.setUser(user); // Set the user in the store if logged in
//   } else {
//     authStore.clearUser(); // Clear user in the store if logged out
//   }
// });

app.use(router);

app.mount('#app');
