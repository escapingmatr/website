***REMOVED*** defineStore } from 'pinia';
***REMOVED*** auth } from '@/firebase/init';
***REMOVED***
***REMOVED***
  onAuthStateChanged,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
***REMOVED***

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    auth: getAuth(),
  }),
  getters: {
    isAuthenticated: (state) => !!state.user,
  },
  actions: {
    initializeAuthState() {
      // Listen for changes in authentication state
      onAuthStateChanged(this.auth, (user) => {
        this.user = user; // Update the user state in the store
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
