import { defineStore } from 'pinia';
import { useAuthStore } from '@/store/auth';
import { db } from '@/firebase/init';
import { getAuth } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { times } from 'lodash';

export const useStore = defineStore('store', {
  state: () => ({
    bagItems: [],
    wishlistItems: [],
  }),
  actions: {
    addToBag(item, size) {
      const auth = getAuth(); // Get the auth instance
      const timestamp = new Date(Date.now());
      if (auth.currentUser) {
        // If user is logged in, save item to Firebase
        const userId = auth.currentUser.uid;
        const userBagRef = firestore
          .collection('users')
          .doc(userId)
          .collection('bag');
        userBagRef.add(item);
      } else {
        // If user is not logged in, save item to local storage
        const bagItems = localStorage.getItem('bagItems');
        const items = bagItems ? JSON.parse(bagItems) : [];
        items.push(item);
        localStorage.setItem('bagItems', JSON.stringify(items));
      }
      this.bagItems.push({
        item: item,
        size: size,
        timestamp: timestamp,
      }); // Update state
    },
    addToWishlist(item, size) {
      const auth = getAuth(); // Get the auth instance
      const timestamp = new Date(Date.now());
      if (auth.currentUser) {
        // If user is logged in, save item to Firebase
        const userId = auth.currentUser.uid;
        const userWishlistRef = firestore
          .collection('users')
          .doc(userId)
          .collection('wishlist');
        userWishlistRef.add(item);
      } else {
        // If user is not logged in, save item to local storage
        const wishlistItems = loadWishlistFromLocalStorage();
        const items = wishlistItems ? JSON.parse(wishlistItems) : [];
        items.push(item);
        localStorage.setItem('wishlistItems', JSON.stringify(items));
      }
      this.wishlistItems.push({
        item: item,
        size: size,
        timestamp: timestamp,
      }); // Update state
    },
  },
});
