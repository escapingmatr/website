import { defineStore } from 'pinia'; // Import Pinia's defineStore
import { db } from '@/firebase/init'; // Import the Firebase db instance
import { query, collection, getDocs, getDoc, doc } from 'firebase/firestore';

// Define your Pinia store
export const useDBStore = defineStore({
  id: 'database',
  state: () => ({
    collectionCategories: [],
    collectionOrders: [],
    collectionProducts: [],
    collectionUsers: [],
    // Add more state properties for other collections if needed
    documentData: {
      photos: [],
      name: '',
      price: 0,
      units: {},
      description: '',
      materials: '',
      sku: '',
    },
  }),
  getters: {
    getDocumentData() {
      return this.documentData;
    },
  },
  actions: {
    async fetchCollectionCategories() {
      try {
        const querySnapshot = await getDocs(
          query(collection(db, 'categories'))
        );
        const data = querySnapshot.docs.map((doc) => doc.data());
        this.collectionCategories = data;
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
      } catch (error) {
        console.error('Error fetching Orders data:', error);
      }
    },
    async fetchCollectionProducts() {
      try {
        const querySnapshot = await getDocs(query(collection(db, 'products')));
        const data = querySnapshot.docs.map((doc) => doc.data());
        this.collectionProducts = data;
      } catch (error) {
        console.error('Error fetching Products data:', error);
      }
    },
    async fetchCollectionUsers() {
      try {
        const querySnapshot = await getDocs(query(collection(db, 'users')));
        const data = querySnapshot.docs.map((doc) => doc.data());
        this.collectionUsers = data;
      } catch (error) {
        console.error('Error fetching Users data:', error);
      }
    },
    async fetchDocumentFromFirestore(collection, documentId) {
      try {
        const docSnap = await getDoc(doc(db, collection, documentId));

        if (docSnap.exists()) {
          this.documentData = docSnap.data();
        } else {
          // Handle document not found
          console.log('document not found');
        }
      } catch (error) {
        // Handle error
        console.error('Error fetching document:', error);
      }
    },

    // Add more actions for other collections if needed
  },
});
