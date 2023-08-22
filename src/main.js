import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from '@/router';
import { createPinia } from 'pinia';
// import { getAuth, onAuthStateChanged } from 'firebase/auth';
// import { useAuthStore } from './store/auth'; // Import the auth store module

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);

// import { initializeApp } from 'firebase/app';
// import { getFirestore } from 'firebase/firestore';

// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: 'AIzaSyCvrggarlcUK9s_pHdZ1FZ3NGdut5Ivflo',
//   authDomain: 'intentions-b068f.firebaseapp.com',
//   projectId: 'intentions-b068f',
//   storageBucket: 'intentions-b068f.appspot.com',
//   messagingSenderId: '287925510546',
//   appId: '1:287925510546:web:0ee0f69ae0f7618bd8a14b',
//   measurementId: 'G-4F73SX9NWV',
// };

// // Initialize Firebase
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
