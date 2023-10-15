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
      const bagItem = {
        item: item,
        size: size,
        timestamp: timestamp,
      };

      if (auth.currentUser) {
        // If the user is logged in, save the bag item to Firebase
        const userId = auth.currentUser.uid;
        const userBagRef = firestore
          .collection('users')
          .doc(userId)
          .collection('bag');
        userBagRef.add(bagItem);
      } else {
        // If the user is not logged in, save the bag item to local storage
        const bagItems = localStorage.getItem('bagItems');
        const items = bagItems ? JSON.parse(bagItems) : [];
        items.push(bagItem);
        localStorage.setItem('bagItems', JSON.stringify(items));
      }
      this.bagItems.push(bagItem); // Update state
    },
    removeFromBag(bagItem) {
      const auth = getAuth(); // Get the auth instance
      if (auth.currentUser) {
        // If the user is logged in, remove the item from Firebase
        const userId = auth.currentUser.uid;
        const userBagRef = db
          .collection('users')
          .doc(userId)
          .collection('bagItem');

        // To remove the item by timestamp, query for the specific item and delete it
        userWishlistRef
          .where('timestamp', '==', bagItem.timestamp)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              doc.ref.delete();
            });
          });
      } else {
        // If the user is not logged in, remove the item from local storage
        const bagItems = localStorage.getItem('bagItems');
        const items = bagItems ? JSON.parse(bagItems) : [];

        // Find the index of the item to remove by comparing timestamps
        const index = items.findIndex(
          (item) => item.timestamp === bagItem.timestamp
        );
        if (index !== -1) {
          items.splice(index, 1);
          localStorage.setItem('bagItems', JSON.stringify(items));
        }
      }

      // Remove the item from the local state by comparing timestamps
      const index = this.bagItems.findIndex(
        (item) => item.timestamp === bagItem.timestamp
      );
      if (index !== -1) {
        this.bagItems.splice(index, 1);
      }
    },
    addToWishlist(item, size) {
      const auth = getAuth(); // Get the auth instance
      const timestamp = new Date(Date.now());
      const wishlistItem = {
        item: item,
        size: size,
        timestamp: timestamp,
      };

      if (auth.currentUser) {
        // If the user is logged in, save the wishlist item to Firebase
        const userId = auth.currentUser.uid;
        const userWishlistRef = firestore
          .collection('users')
          .doc(userId)
          .collection('wishlist');
        userWishlistRef.add(wishlistItem);
      } else {
        // If the user is not logged in, save the wishlist item to local storage
        const wishlistItems = localStorage.getItem('wishlistItems');
        const items = wishlistItems ? JSON.parse(wishlistItems) : [];
        items.push(wishlistItem);
        localStorage.setItem('wishlistItems', JSON.stringify(items));
      }
      this.wishlistItems.push(wishlistItem); // Update state
    },
    removeFromWishlist(wishItem) {
      const auth = getAuth(); // Get the auth instance
      if (auth.currentUser) {
        // If the user is logged in, remove the item from Firebase
        const userId = auth.currentUser.uid;
        const userWishlistRef = db
          .collection('users')
          .doc(userId)
          .collection('wishlist');

        // To remove the item by timestamp, query for the specific item and delete it
        userWishlistRef
          .where('timestamp', '==', wishItem.timestamp)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              doc.ref.delete();
            });
          });
      } else {
        // If the user is not logged in, remove the item from local storage
        const wishlistItems = localStorage.getItem('wishlistItems');
        const items = wishlistItems ? JSON.parse(wishlistItems) : [];

        // Find the index of the item to remove by comparing timestamps
        const index = items.findIndex(
          (item) => item.timestamp === wishItem.timestamp
        );
        if (index !== -1) {
          items.splice(index, 1);
          localStorage.setItem('wishlistItems', JSON.stringify(items));
        }
      }

      // Remove the item from the local state by comparing timestamps
      const index = this.wishlistItems.findIndex(
        (item) => item.timestamp === wishItem.timestamp
      );
      if (index !== -1) {
        this.wishlistItems.splice(index, 1);
      }
    },
  },
});
