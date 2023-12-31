import { defineStore } from 'pinia';
import { auth } from '@/firebase/init';
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    auth: getAuth(),
    initialized: false, // Add an initialized property
  }),
  getters: {
    isAuthenticated: (state) => !!state.user,
  },
  actions: {
    initializeAuthState() {
      return new Promise((resolve) => {
        onAuthStateChanged(this.auth, (user) => {
          this.user = user;
          this.initialized = true; // Set initialized to true
          resolve();
        });
      });
    },
    async signInWithEmailAndPassword(email, password) {
      try {
        const userCredential = await signInWithEmailAndPassword(
          this.auth,
          email,
          password
        );
        this.user = userCredential.user;
        return true; // Sign-in successful
      } catch (error) {
        switch (error.code) {
          case 'auth/invalid-email':
            console.log('Invalid email');
            break;
          case 'auth/user-not-found':
            console.log('No account with that email was found');
            break;
          case 'auth/wrong-password':
            console.log('Incorrect password');
            break;
          default:
            console.log('Email or password was incorrect');
            break;
        }
        return false; // Sign-in failed
      }
    },
    async signInWithGoogle() {
      const provider = new GoogleAuthProvider();
      try {
        const result = await signInWithPopup(auth, provider);
        this.user = result.user;
        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
    async signOut() {
      await auth.signOut();
      this.user = null;
    },
  },
});
