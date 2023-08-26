***REMOVED*** createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import About from '@/views/About.vue';
import Contact from '@/views/Contact.vue';
import Shop from '@/views/Shop.vue';
import Cart from '@/views/Cart.vue';
import Wishlist from '@/views/Wishlist.vue';
import Signup from '@/views/Signup.vue';
import Login from '@/views/Login.vue';
import Profile from '@/views/Profile.vue';
import Product from '@/views/Product.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/about', name: 'About', component: About },
  { path: '/contact', name: 'Contact', component: Contact },
  { path: '/shop', name: 'Shop', component: Shop },
  { path: '/cart', name: 'Cart', component: Cart },
  { path: '/wishlist', name: 'Wishlist', component: Wishlist },
  { path: '/signup', name: 'Signup', component: Signup },
  { path: '/login', name: 'Login', component: Login },
  { path: '/profile', name: 'Profile', component: Profile },
  { path: '/shop/:stocksku', name: 'product', component: Product, props: true },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;