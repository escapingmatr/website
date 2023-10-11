import { defineStore } from 'pinia'; // Import Pinia's defineStore
import { db } from '@/firebase/init'; // Import the Firebase db instance
import { query, collection, getDocs } from 'firebase/firestore';

// Define your Pinia store
export const useDBStore = defineStore({
  id: 'database',
  state: () => ({
    collectionCategories: [],
    collectionOrders: [],
    collectionProducts: [],
    collectionUsers: [],
    // Add more state properties for other collections if needed
  }),
  actions: {
    async fetchCollectionCategories() {
      try {
        const querySnapshot = await getDocs(
          query(collection(db, 'categories'))
        );
        const data = querySnapshot.docs.map((doc) => doc.data());
        this.collectionCategories = data;
        // console.log(this.collectionCategories); // test
        querySnapshot.forEach((doc) => {
          this.collectionCategories.push(doc.data());
        });
      } catch (error) {
        console.error('Error fetching Categories data:', error);
      }
    },
    async fetchCollectionOrders() {
      try {
        const querySnapshot = await getDocs(query(collection(db, 'orders')));
        const data = querySnapshot.docs.map((doc) => doc.data());
        this.collectionOrders = data;
        // console.log(this.collectionOrders); // test
      } catch (error) {
        console.error('Error fetching Orders data:', error);
      }
    },
    async fetchCollectionProducts() {
      try {
        const querySnapshot = await getDocs(query(collection(db, 'products')));
        const data = querySnapshot.docs.map((doc) => doc.data());
        this.collectionProducts = data;
        // console.log(this.collectionProducts); // test
      } catch (error) {
        console.error('Error fetching Products data:', error);
      }
    },
    async fetchCollectionUsers() {
      try {
        const querySnapshot = await getDocs(query(collection(db, 'users')));
        const data = querySnapshot.docs.map((doc) => doc.data());
        this.collectionUsers = data;
        // console.log(this.collectionUsers); // test
      } catch (error) {
        console.error('Error fetching Users data:', error);
      }
    },
    // Add more actions for other collections if needed
  },
});
