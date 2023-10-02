***REMOVED*** defineStore } from 'pinia';
***REMOVED*** auth } from '@/firebase/init';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.user,
  },
  actions: {
    async signInWithEmailAndPassword(email, password) {
      try {
        const userCredential = await auth.signInWithEmailAndPassword(
          email,
          password
        );
        this.user = userCredential.user;
        return true; // Sign-in successful
      } catch (error) {
        console.error(error.message);
        return false; // Sign-in failed
      }
    },
    async signOut() {
      await auth.signOut();
      this.user = null;
    },
  },
});
