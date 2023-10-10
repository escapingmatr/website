***REMOVED*** createApp } from 'vue';
import App from './App.vue';
import router from '@/router';
***REMOVED*** createPinia } from 'pinia';
***REMOVED*** useAuthStore } from '@/store/auth';

const app = createApp(App);

const pinia = createPinia();

app.use(pinia);

const authStore = useAuthStore();
authStore.initializeAuthState();

app.use(router);

app.mount('#app');
