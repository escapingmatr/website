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
        switch (error.code) {
          case 'auth/invalid-email':
            errMsg.value = 'Invalid email';
            break;
          case 'auth/user-not-found':
            errMsg.value = 'No account with that email was found';
            break;
          case 'auth/wrong-password':
            errMsg.value = 'Incorrect password';
            break;
          default:
            errMsg.value = 'Email or password was incorrect';
            break;
        }
        return false; // Sign-in failed
      }
    },
    async signInWithGoogle() {
      const provider = new auth.GoogleAuthProvider();
      try {
        const userCredential = auth.signInWithPopup(auth.getAuth(), provider);
        this.user = userCredential.user;
        return true;
      } catch (error) {
        return false;
      }
    },
    async signOut() {
      await auth.signOut();
      this.user = null;
    },
  },
});
